import { combineReducers } from 'redux';
import generalReducers from './general/reducers';
import productListReducers from '@store/product-list/reducers';
import notificationReducers from '@store/notification/reducers';
import { PersistedState } from 'redux-persist';

const reducers = combineReducers({ generalReducers, productListReducers, notificationReducers });

export default reducers;

export type RootState = ReturnType<typeof reducers> & PersistedState ;
