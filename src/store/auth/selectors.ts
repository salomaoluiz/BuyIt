import { RootState } from '@store/reducers';

import { AuthState } from './types';

const getState = (state: RootState): AuthState => state.authReducer;
const getUserId = (state: RootState): string =>
  state.authReducer.currentUser?.uid || '';
const isLogged = (state: RootState): boolean => state.authReducer.isLogged;
const isLoading = (state: RootState): boolean => state.authReducer.isLoading;
const isAnonymously = (state: RootState): boolean =>
  state.authReducer.isAnonymously;

export { getState, getUserId, isLogged, isLoading, isAnonymously };
