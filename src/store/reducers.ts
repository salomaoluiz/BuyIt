import { combineReducers } from 'redux';
import uiReducer from './general-store/ui-reducers';

const reducers = combineReducers({ uiReducer });

export default reducers;

export type RootState = ReturnType<typeof reducers>;