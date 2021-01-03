import { FirebaseAuthTypes } from '@react-native-firebase/auth';

import { AuthTypes, AuthAction, AuthRegisterForm } from './types';

const actions = {
  logout: () => ({ type: AuthTypes.LOGOUT }),
  requestLogout: () => ({ type: AuthTypes.REQUEST_LOGOUT }),
  login: (
    currentUser: FirebaseAuthTypes.User,
  ): AuthAction<{ currentUser: FirebaseAuthTypes.User }> => ({
    type: AuthTypes.LOGIN,
    payload: { currentUser },
  }),
  requestLoginEmailPassword: (
    email: string,
    password: string,
  ): AuthAction<{ email: string; password: string }> => ({
    type: AuthTypes.REQUEST_LOGIN_EMAIL_PASSWORD,
    payload: { email, password },
  }),
  requestLoginAnonymously: () => ({
    type: AuthTypes.REQUEST_LOGIN_ANONYMOUSLY,
  }),
  requestRegisterEmailPassword: (
    props: AuthRegisterForm,
  ): AuthAction<AuthRegisterForm> => ({
    type: AuthTypes.REQUEST_REGISTER_EMAIL_PASSWORD,
    payload: { ...props },
  }),
  registerSuccess: () => ({
    type: AuthTypes.REGISTER_SUCCESS
  }),
  authError: (error: Error) => ({
    type: AuthTypes.AUTH_ERROR,
    payload: { error },
  }),
};

export default actions;
