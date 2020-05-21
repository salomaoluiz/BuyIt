import { combineReducers } from 'redux';
import uiReducer from './general-store/ui-reducers';
import productListReducers from '@routes/product-list/product-list/store/reducers';

const reducers = combineReducers({ uiReducer, productListReducers });

export default reducers;

export type RootState = ReturnType<typeof reducers>;
