import { SET_LOADER } from './constants';
import { AnyAction } from 'redux';

export interface UIReducerState {
  loading: boolean;
}

interface SetLoader {
  type: typeof SET_LOADER;
  payload: { loading: boolean };
}

export type UIActions = SetLoader | AnyAction;
