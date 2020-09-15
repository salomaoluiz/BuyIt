import { RootState } from '@store/reducers';
import { AuthState } from './types';

const getState = (state: RootState): AuthState => state.authReducer;
const getUserId = (state: RootState): string =>
  state.authReducer.currentUser?.uid || '';

export { getState, getUserId };
