import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { takeLatest, put, call, select } from 'redux-saga/effects';

import useFirebaseError from '@errors/useFirebaseError';
import navigationService from '@navigator/services/navigationService';
import { notificationActions } from '@store/notification';

import { authActions, authModels, authSelectors } from './';
import { AuthTypes, AuthAction, AuthRegisterForm } from './types';
import { notificationMessages } from './utils';

const { getErrorMessage } = useFirebaseError('auth');

export function* requestLoginEmailPassword(
  props: AuthAction<{ email: string; password: string }>,
) {
  const email = props.payload?.email;
  const password = props.payload?.password;

  try {
    const isAnonymously = yield select(authSelectors.isAnonymously);

    if (email && password) {
      const userCredentials = yield call(
        authModels.loginWithEmailPassword,
        email,
        password,
      );

      yield put(authActions.login(userCredentials.user));

      if (isAnonymously) yield call(navigationService.goBack);
    }
  } catch (err) {
    const errorMessage = getErrorMessage(err.message);
    const notificationParams = notificationMessages.opsError(errorMessage);

    yield put(notificationActions.showBannerAsync(notificationParams));
    yield put(authActions.authError(err));
  }
}

export function* requestLogout() {
  try {
    const isLogged = yield select(authSelectors.isLogged);

    if (isLogged) {
      yield call(authModels.logout);
    }

    yield put(authActions.logout());
  } catch {
    yield put(authActions.logout());
  }
}

export function* requestRegisterEmailPassword(
  props: AuthAction<AuthRegisterForm>,
) {
  const email = props.payload?.email;
  const password = props.payload?.password;
  const name = props.payload?.name;

  try {
    if (email && password) {
      const userCredentials: FirebaseAuthTypes.UserCredential = yield call(
        authModels.registerEmailPassword,
        email,
        password,
      );

      yield call(authModels.updateUserProfile, userCredentials.user, name);

      yield call(authModels.sendEmailVerification, userCredentials.user);
      const notificationParams = notificationMessages.registerSuccess;

      yield put(notificationActions.showBannerAsync(notificationParams));
      yield put(authActions.registerSuccess());
      yield call(navigationService.goBack);
    }
  } catch (err) {
    const errorMessage = getErrorMessage(err.message);
    const notificationParams = notificationMessages.opsError(errorMessage);

    yield put(notificationActions.showBannerAsync(notificationParams));
    yield put(authActions.authError(err));
  }
}

export default [
  takeLatest(AuthTypes.REQUEST_LOGIN_EMAIL_PASSWORD, requestLoginEmailPassword),
  takeLatest(AuthTypes.REQUEST_LOGOUT, requestLogout),
  takeLatest(
    AuthTypes.REQUEST_REGISTER_EMAIL_PASSWORD,
    requestRegisterEmailPassword,
  ),
];
