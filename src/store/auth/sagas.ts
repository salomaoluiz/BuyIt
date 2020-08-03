import { takeLatest, put, call, select } from 'redux-saga/effects';
import { AuthTypes, AuthActions, AuthRegisterForm, AuthState } from './types';
import { authActions, authModels, authSelectors } from './';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import useFirebaseError from '@errors/useFirebaseError';
import { notificationActions } from '@store/notification';
import errorsString from '@locales/general-errors';
import * as registerStrings from '@locales/register';
import navigationService from '@navigator/services/navigationService';

const { getErrorMessage } = useFirebaseError('auth');

export function* loginEmailPasswordAsync(
  props: AuthActions<{ email: string; password: string }>,
) {
  const email = props.payload?.email;
  const password = props.payload?.password;

  const { isLoggedIn }: AuthState = yield select(authSelectors.getState);
  yield put(authActions.setLoading(true));

  try {
    if (email && password) {
      const userCredentials: FirebaseAuthTypes.UserCredential = yield call(
        authModels.loginWithEmailPassword,
        email,
        password,
      );

      if (isLoggedIn) navigationService.goBack();
      yield put(authActions.login(userCredentials.user));
      yield put(authActions.loginEmailPassword());
    }
  } catch (e) {
    const errorMessage = getErrorMessage(e.message);

    const notificationParams = {
      title: errorsString.generalErrors.opsWeHaveAProblem,
      body: errorMessage,
    };

    yield put(notificationActions.sendNotificationAsync(notificationParams));
  } finally {
    yield put(authActions.setLoading(false));
  }
}

export function* logoutAsync() {
  yield put(authActions.setLoading(true));
  const { isAnonymously, currentUser }: AuthState = yield select(
    authSelectors.getState,
  );

  try {
    if (isAnonymously && currentUser) {
      yield call(authModels.deleteAccount, currentUser);
    } else {
      yield call(authModels.logout);
    }
    yield put(authActions.logout());
  } catch {
    yield put(authActions.logout());
  } finally {
    yield put(authActions.setLoading(false));
  }
}

export function* registerEmailPasswordAsync(
  props: AuthActions<AuthRegisterForm>,
) {
  const email = props.payload?.email;
  const password = props.payload?.password;
  const name = props.payload?.name;
  yield put(authActions.setLoading(true));

  try {
    if (email && password) {
      const userCredentials: FirebaseAuthTypes.UserCredential = yield call(
        authModels.registerEmailPassword,
        email,
        password,
      );

      yield call(authModels.updateUserProfile, userCredentials.user, name);

      yield call(authModels.sendEmailVerification, userCredentials.user);
      const notificationParams = {
        title: registerStrings.registerWithSuccess,
        body: registerStrings.verifyYourEmailToConfirm,
        icon: 'emoticon-excited-outline',
      };

      yield put(notificationActions.sendNotificationAsync(notificationParams));
      yield call(navigationService.goBack);
    }
  } catch (e) {
    const errorMessage = getErrorMessage(e.message);

    const notificationParams = {
      title: errorsString.generalErrors.opsWeHaveAProblem,
      body: errorMessage,
    };

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
