import { combineReducers } from 'redux';
import uiReducer from './general-store/ui-reducers';
import listItemsReducer from '@routes/list-itens/store/reducers';

const reducers = combineReducers({ uiReducer, listItemsReducer });

export default reducers;

export type RootState = ReturnType<typeof reducers>;
