import { RootState } from '@store/reducers';
import { AuthState } from './types';

const getState = (state: RootState): AuthState => state.authReducer;

export { getState };
