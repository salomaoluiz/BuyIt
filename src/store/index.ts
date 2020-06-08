import { createStore, Store } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import {
	persistReducer,
	persistStore,
	PersistConfig,
	Persistor,
} from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer, { RootState } from './reducers';

const persistConfig: PersistConfig<RootState> = {
	key: 'root',
	storage: AsyncStorage,
};

const configureStore = (): { store: Store; persistor: Persistor } => {
	const persistedReducer = persistReducer(persistConfig, rootReducer);
	const store = createStore(persistedReducer, {}, composeWithDevTools());

	const persistor = persistStore(store);

	return { store, persistor };
};

export default configureStore;
