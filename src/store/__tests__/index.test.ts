import AsyncStorage from '@react-native-community/async-storage';
import * as redux from 'redux';
import * as reduxPersist from 'redux-persist';
import * as reduxSaga from 'redux-saga';

import configureStore from '@store';

jest.mock('@react-native-community/async-storage', () => ({}));

import rootReducer from '../reducers';

describe('Fluxo Store', () => {
  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
  };

  const persistReducer = jest.spyOn(reduxPersist, 'persistReducer');

  const createSagaMiddleare = jest.spyOn(reduxSaga, 'default');

  const createStore = jest.spyOn(redux, 'createStore');
  const applyMiddleware = jest.spyOn(redux, 'applyMiddleware');

  const mockPersistStoreReturn = {
    dispatch: jest.fn(),
    pause: jest.fn(),
    persist: jest.fn(),
    purge: jest.fn(),
    flush: jest.fn(),
    getState: jest.fn(),
    subscribe: jest.fn(),
  };

  const persistStore = jest
    .spyOn(reduxPersist, 'persistStore')
    .mockReturnValue(mockPersistStoreReturn);

  test('deve configurar a saga corretamente instanciando as sagas e retornando o persistor e a store', () => {
    const { persistor, store } = configureStore();
    const sagaMiddleware = createSagaMiddleare.mock.results[0].value;

    expect(persistReducer).toHaveBeenCalledWith(persistConfig, rootReducer);
    expect(createSagaMiddleare).toHaveBeenCalled();
    expect(applyMiddleware).toHaveBeenCalledWith(sagaMiddleware);

    expect(createStore).toHaveBeenCalledWith(
      persistReducer.mock.results[0].value,
      {},
      expect.any(Function),
    );

    expect(persistStore).toHaveBeenCalledWith(
      createStore.mock.results[0].value,
    );

    expect(persistor).toEqual(persistStore.mock.results[0].value);
    expect(store).toEqual(createStore.mock.results[0].value);
  });
});
