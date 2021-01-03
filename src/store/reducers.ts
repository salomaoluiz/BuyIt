import { combineReducers } from 'redux';
import { PersistedState } from 'redux-persist';

import notificationReducer from '@store/notification/reducer';
import productListReducer from '@store/product-list/reducer';

import authReducer from './auth/reducer';
import generalReducer from './general/reducer';
import stockReducer from './stock/reducer';

const reducers = combineReducers({
  generalReducer,
  productListReducer,
  notificationReducer,
  stockReducer,
  authReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers> & PersistedState;
