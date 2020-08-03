import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export enum AuthTypes {
  SET_LOADING = '@@AUTH/SET_LOADING',
  LOGIN = '@@AUTH/LOGIN',
  LOGIN_EMAIL_PASSWORD = '@@AUTH/LOGIN_EMAIL_PASSWORD',
  LINK_EMAIL_ACCOUNT_ASYNC = '@@AUTH/LINK_EMAIL_ACCOUNT_ASYNC',
  LOGIN_EMAIL_PASSWORD_ASYNC = '@@AUTH/LOGIN_EMAIL_PASSWORD_ASYNC',
  LOGIN_ANONYMOUSLY = '@@AUTH/LOGIN_ANONYMOUSLY',
  LOGOUT = '@@AUTH/LOGOUT',
  LOGOUT_ASYNC = '@@AUTH/LOGOUT_ASYNC',
  REGISTER_EMAIL_PASSWORD_ASYNC = '@@AUTH/REGISTER_EMAIL_PASSWORD_ASYNC',
}

export type AuthState = {
  isLoggedIn?: boolean;
  isAnonymously?: boolean;
  isOnline?: boolean;
  isLoading?: boolean;
  email?: string;
  currentUser?: FirebaseAuthTypes.User;
};

export type AuthActions<Payload> = {
  type: AuthTypes;
  payload: Partial<Payload>;
};

export type AuthReducer = (
  state: AuthState,
  actions: AuthReducerActions,
) => AuthState;

export interface AuthLoginForm {
  email: string;
  password: string;
}

export interface AuthRegisterForm extends AuthLoginForm {
  name: string;
  confirmPassword: string;
}

export type AuthReducerActions = AuthActions<Partial<AuthState>>;
