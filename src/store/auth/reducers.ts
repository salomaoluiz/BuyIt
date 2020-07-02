import {
  AuthActions,
  AuthState,
  AuthTypes,
  AuthReducer,
  AuthReducerActions,
} from './types';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

const initialState: AuthState = {
  isLoggedIn: false,
  isAnonymously: false,
  isOnline: false,
  isLoading: false,
  email: '',
  currentUser: undefined,
};

const setLoading: AuthReducer = (
  state: AuthState,
  actions: AuthReducerActions,
): AuthState => ({
  ...state,
  isLoading: actions.payload?.isLoading,
});

const logout: AuthReducer = (): AuthState => ({
  ...initialState,
});

const login: AuthReducer = (
  state: AuthState,
  actions: AuthActions<{ currentUser?: FirebaseAuthTypes.User }>,
): AuthState => ({
  ...state,
  currentUser: actions.payload?.currentUser,
});

const loginEmailPassword = (state: AuthState): AuthState => ({
  ...state,
  isAnonymously: false,
  isLoggedIn: true,
  isOnline: true,
});

const loginAnonymously = (
  state: AuthState,
  actions: AuthReducerActions,
): AuthState => ({
  ...state,
  isAnonymously: true,
  isLoggedIn: true,
  isOnline: !!actions.payload?.isOnline,
});

const authReducerMap = new Map<AuthTypes, AuthReducer>([
  [AuthTypes.SET_LOADING, setLoading],
  [AuthTypes.LOGOUT, logout],
  [AuthTypes.LOGIN_ANONYMOUSLY, loginAnonymously],
  [AuthTypes.LOGIN, login],
  [AuthTypes.LOGIN_EMAIL_PASSWORD, loginEmailPassword],
]);

const authReducer = (
  state: AuthState = initialState,
  actions: AuthReducerActions,
): AuthState => {
  const reducer = authReducerMap.get(actions.type);
  if (reducer) return reducer(state, actions);
  return state;
};

export default authReducer;
