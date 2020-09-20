import { takeLatest, put, call, select } from 'redux-saga/effects';
import { AuthTypes, AuthActions, AuthRegisterForm } from './types';
import { authActions, authModels, authSelectors } from './';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import useFirebaseError from '@errors/useFirebaseError';
import { notificationActions } from '@store/notification';
import navigationService from '@navigator/services/navigationService';
import { notificationMessages } from './utils';

const { getErrorMessage } = useFirebaseError('auth');

export function* loginEmailPasswordAsync(
  props: AuthActions<{ email: string; password: string }>,
) {
  const email = props.payload?.email;
  const password = props.payload?.password;

  try {
    const isAnonymously = yield select(authSelectors.isAnonymously);
    yield put(authActions.setLoading(true));

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

    yield put(notificationActions.sendNotificationAsync(notificationParams));
  } finally {
    yield put(authActions.setLoading(false));
  }
}

export function* logoutAsync() {
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

export function* registerEmailPasswordAsync(
  props: AuthActions<AuthRegisterForm>,
) {
  const email = props.payload?.email;
  const password = props.payload?.password;
  const name = props.payload?.name;

  try {
    yield put(authActions.setLoading(true));

    if (email && password) {
      const userCredentials: FirebaseAuthTypes.UserCredential = yield call(
        authModels.registerEmailPassword,
        email,
        password,
      );

      yield call(authModels.updateUserProfile, userCredentials.user, name);

      yield call(authModels.sendEmailVerification, userCredentials.user);
      const notificationParams = notificationMessages.registerSuccess;

      yield put(notificationActions.sendNotificationAsync(notificationParams));
      yield call(navigationService.goBack);
    }
  } catch (e) {
    const errorMessage = getErrorMessage(e.message);
    const notificationParams = notificationMessages.opsError(errorMessage);

    yield put(notificationActions.sendNotificationAsync(notificationParams));
  } finally {
    yield put(authActions.setLoading(false));
  }
}

export default [
  takeLatest(AuthTypes.LOGIN_EMAIL_PASSWORD_ASYNC, loginEmailPasswordAsync),
  takeLatest(AuthTypes.LOGOUT_ASYNC, logoutAsync),
  takeLatest(
    AuthTypes.REGISTER_EMAIL_PASSWORD_ASYNC,
    registerEmailPasswordAsync,
  ),
];
