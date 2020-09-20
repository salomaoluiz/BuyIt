import { AuthTypes, AuthActions, AuthRegisterForm } from './types';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

const actions = {
  setLoading: (isLoading: boolean): AuthActions<{ isLoading: boolean }> => ({
    type: AuthTypes.SET_LOADING,
    payload: { isLoading },
  }),
  logout: () => ({ type: AuthTypes.LOGOUT }),
  logoutAsync: (): AuthActions<{}> => ({
    type: AuthTypes.LOGOUT_ASYNC,
    payload: {},
  }),
  login: (
    currentUser: FirebaseAuthTypes.User,
  ): AuthActions<{ currentUser: FirebaseAuthTypes.User }> => ({
    type: AuthTypes.LOGIN,
    payload: { currentUser },
  }),
  loginEmailPasswordAsync: (
    email: string,
    password: string,
  ): AuthActions<{ email: string; password: string }> => ({
    type: AuthTypes.LOGIN_EMAIL_PASSWORD_ASYNC,
    payload: { email, password },
  }),
  loginAnonymously: (
    isOnline?: boolean,
  ): AuthActions<{ isOnline: boolean }> => ({
    type: AuthTypes.LOGIN_ANONYMOUSLY,
    payload: { isOnline: !!isOnline },
  }),
  registerEmailPasswordAsync: (
    props: AuthRegisterForm,
  ): AuthActions<AuthRegisterForm> => ({
    type: AuthTypes.REGISTER_EMAIL_PASSWORD_ASYNC,
    payload: { ...props },
  }),
};

export default actions;
