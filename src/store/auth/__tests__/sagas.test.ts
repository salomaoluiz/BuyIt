import { put, call, select } from 'redux-saga/effects';

import useFirebaseError from '@errors/useFirebaseError';
import { translate } from '@locales';
import navigationService from '@navigator/services/navigationService';
import { notificationActions } from '@store/notification';
import { mockCurrentUser } from 'src/__tests__/firebase-mocks';

import { authModels, authActions, authSelectors } from '../';
import {
  requestLoginEmailPassword,
  requestLogout,
  requestRegisterEmailPassword,
} from '../sagas';
import { notificationMessages } from '../utils';

describe('Auth Saga - Login com Email e Senha', () => {
  jest.spyOn(authModels, 'loginWithEmailPassword');
  jest.spyOn(authModels, 'registerEmailPassword');

  jest.spyOn(authModels, 'logout');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('deve logar corretamente', () => {
    const action = authActions.requestLoginEmailPassword('a@a.a', '123456');

    const gen = requestLoginEmailPassword(action);

    expect(gen.next().value).toEqual(select(authSelectors.isAnonymously));

    expect(gen.next().value).toEqual(
      call(
        authModels.loginWithEmailPassword,
        action.payload.email,
        action.payload.password,
      ),
    );

    expect(gen.next({ user: mockCurrentUser }).value).toEqual(
      put(authActions.login(mockCurrentUser)),
    );

    expect(gen.next().done).toBe(true);
  });

  test('deve apresentar uma notificação caso dê erro', () => {
    const error = new TypeError('auth/invalid-email');
    const action = authActions.requestLoginEmailPassword('a@a.a', '123456');

    const gen = requestLoginEmailPassword(action);
    expect(gen.next().value).toEqual(select(authSelectors.isAnonymously));

    expect(gen.next(error).value).toEqual(
      call(
        authModels.loginWithEmailPassword,
        action.payload.email,
        action.payload.password,
      ),
    );

    const notificationParams = {
      title: translate('errors.general.opsWeHaveAProblem'),
      body: translate('errors.auth.emailInvalid'),
    };

    expect(gen.throw(error).value).toEqual(
      put(notificationActions.showBannerAsync(notificationParams)),
    );

    expect(gen.next(error).value).toEqual(put(authActions.authError(error)));
    expect(gen.next().done).toBe(true);
  });

  test('se estiver logado deve chamar o model de logout seguido pela action de logout', () => {
    const gen = requestLogout();

    expect(gen.next().value).toEqual(select(authSelectors.isLogged));
    expect(gen.next(true).value).toEqual(call(authModels.logout));
    expect(gen.next(true).value).toEqual(put(authActions.logout()));
    expect(gen.next().done).toBe(true);
  });

  test('caso de problema com o model de logout deve executar somente a action de logout', () => {
    const error = new Error('auth/invalid-email');

    const gen = requestLogout();

    expect(gen.next().value).toEqual(select(authSelectors.isLogged));
    expect(gen.throw(error).value).toEqual(put(authActions.logout()));
  });

  test('deve se registrar, atualizar o nome, enviar o email de verificação e retornar a tela anterior se tudo for bem sucedido', () => {
    const action = authActions.requestRegisterEmailPassword({
      email: 'a@a.a',
      confirmPassword: '123456',
      name: 'aaaa',
      password: '123456',
    });
    const gen = requestRegisterEmailPassword(action);

    expect(gen.next().value).toEqual(
      call(
        authModels.registerEmailPassword,
        action.payload.email,
        action.payload.password,
      ),
    );

    expect(gen.next({ user: mockCurrentUser }).value).toEqual(
      call(authModels.updateUserProfile, mockCurrentUser, action.payload.name),
    );

    expect(gen.next({ user: mockCurrentUser }).value).toEqual(
      call(authModels.sendEmailVerification, mockCurrentUser),
    );

    expect(gen.next().value).toEqual(
      put(
        notificationActions.showBannerAsync(
          notificationMessages.registerSuccess,
        ),
      ),
    );

    expect(gen.next().value).toEqual(put(authActions.registerSuccess()));
    expect(gen.next().value).toEqual(call(navigationService.goBack));
    expect(gen.next().done).toBe(true);
  });

  test('em caso de erro, deve disparar uma notificação informando', () => {
    const action = authActions.requestRegisterEmailPassword({
      email: 'a@a.a',
      confirmPassword: '123456',
      name: 'aaaa',
      password: '123456',
    });
    const gen = requestRegisterEmailPassword(action);

    expect(gen.next().value).toEqual(
      call(
        authModels.registerEmailPassword,
        action.payload.email,
        action.payload.password,
      ),
    );
    const error = new Error('email-already-in-use');
    const errorMessage = useFirebaseError('auth').getErrorMessage(
      error.message,
    );
    const notificationError = notificationMessages.opsError(errorMessage);

    expect(gen.throw(error).value).toEqual(
      put(notificationActions.showBannerAsync(notificationError)),
    );

    expect(gen.next().value).toEqual(put(authActions.authError(error)));
    expect(gen.next().done).toBe(true);
  });
});
