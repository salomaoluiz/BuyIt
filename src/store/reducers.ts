import { combineReducers } from 'redux';
import generalReducer from './general/reducer';
import productListReducer from '@store/product-list/reducer';
import authReducer from './auth/reducer';
import stockReducer from './stock/reducer';
import notificationReducer from '@store/notification/reducer';
import { PersistedState } from 'redux-persist';

const reducers = combineReducers({
  generalReducer,
  productListReducer,
  notificationReducer,
  stockReducer,
  authReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers> & PersistedState;
