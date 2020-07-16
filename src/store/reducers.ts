import { combineReducers } from 'redux';
import generalReducers from './general/reducers';
import productListReducers from '@store/product-list/reducers';
import { PersistedState } from 'redux-persist';

const reducers = combineReducers({ generalReducers, productListReducers });

export default reducers;

export type RootState = ReturnType<typeof reducers> & PersistedState ;
