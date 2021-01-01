import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export enum AuthTypes {
  LOGIN = '@auth/LOGIN',
  REQUEST_LOGIN_EMAIL_PASSWORD = '@auth/REQUEST_LOGIN_EMAIL_PASSWORD',
  REQUEST_LOGIN_ANONYMOUSLY = '@auth/REQUEST_LOGIN_ANONYMOUSLY',
  LOGOUT = '@auth/LOGOUT',
  AUTH_ERROR = '@auth/AUTH_ERROR',
  REQUEST_LOGOUT = '@auth/REQUEST_LOGOUT',
  REQUEST_REGISTER_EMAIL_PASSWORD = '@auth/REQUEST_REGISTER_EMAIL_PASSWORD',
  REGISTER_SUCCESS = '@auth/REGISTER_SUCCESS'
}

export type AuthState = {
  isLogged: boolean;
  isLoading: boolean;
  isAnonymously: boolean;
  email: string;
  currentUser?: FirebaseAuthTypes.User;
  error?: Error;
};

export type AuthAction<Payload> = {
  type: AuthTypes;
  payload: Payload;
};

export type AuthReducer = (
  state: AuthState,
  actions: AuthAction<AuthState>,
) => AuthState;

export interface AuthLoginForm {
  email: string;
  password: string;
}

export interface AuthRegisterForm extends AuthLoginForm {
  name: string;
  confirmPassword: string;
}
