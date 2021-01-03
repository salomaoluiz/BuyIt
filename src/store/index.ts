import AsyncStorage from '@react-native-community/async-storage';
import { createStore, Store, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer, persistStore, Persistor } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import rootReducer, { RootState } from './reducers';
import rootSagas from './root-sagas';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const configureStore = (): { store: Store; persistor: Persistor } => {
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const sagaMiddleware = createSagaMiddleware();

  
  const store: Store<RootState> = createStore(
    persistedReducer,
    {},
    composeWithDevTools(applyMiddleware(sagaMiddleware)),
  );

  sagaMiddleware.run(rootSagas);

  const persistor = persistStore(store);

  return { store, persistor };
};

export default configureStore;
