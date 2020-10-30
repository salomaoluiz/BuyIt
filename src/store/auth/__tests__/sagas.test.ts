import { authModels, authActions, authSelectors } from '../';
import { mockCurrentUser } from 'src/__tests__/firebase-mocks';
import {
  loginEmailPasswordAsync,
  logoutAsync,
  registerEmailPasswordAsync,
} from '../sagas';
import { put, call, select } from 'redux-saga/effects';
import { notificationActions } from '@store/notification';
import navigationService from '@navigator/services/navigationService';
import { notificationMessages } from '../utils';
import useFirebaseError from '@errors/useFirebaseError';
import appLocale from '@locales';

const strings = appLocale();

describe('Auth Saga - Login com Email e Senha', () => {
  jest.spyOn(authModels, 'loginWithEmailPassword');
  jest.spyOn(authModels, 'registerEmailPassword');

  jest.spyOn(authModels, 'logout');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('deve logar corretamente', () => {
    const action = authActions.loginEmailPasswordAsync('a@a.a', '123456');

    const gen = loginEmailPasswordAsync(action);

    expect(gen.next().value).toEqual(select(authSelectors.isAnonymously));
    expect(gen.next().value).toEqual(put(authActions.setLoading(true)));

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

    expect(gen.next().value).toEqual(put(authActions.setLoading(false)));

    expect(gen.next().done).toBe(true);
  });

  test('deve apresentar uma notificação caso dê erro', async () => {
    const error = new Error('auth/invalid-email');
    const action = authActions.loginEmailPasswordAsync('a@a.a', '123456');

    const gen = loginEmailPasswordAsync(action);
    expect(await gen.next().value).toEqual(select(authSelectors.isAnonymously));
    expect(await gen.next({ user: mockCurrentUser }).value).toEqual(
      put(authActions.setLoading(true)),
    );

    expect(await gen.next(error).value).toEqual(
      call(
        authModels.loginWithEmailPassword,
        action.payload.email,
        action.payload.password,
      ),
    );

    const notificationParams = {
      title: strings.errors.general.opsWeHaveAProblem,
      body: strings.errors.general.tryAgainLater,
    };

    expect(await gen.next().value).toEqual(
      put(notificationActions.showBannerAsync(notificationParams)),
    );

    expect(await gen.next().value).toEqual(put(authActions.setLoading(false)));
    expect(await gen.next().done).toBe(true);
  });

  test('se estiver logado deve chamar o model de logout seguido pela action de logout', () => {
    const gen = logoutAsync();

    expect(gen.next().value).toEqual(select(authSelectors.isLogged));
    expect(gen.next(true).value).toEqual(call(authModels.logout));
    expect(gen.next(true).value).toEqual(put(authActions.logout()));
    expect(gen.next().done).toBe(true);
  });

  test('caso de problema com o model de logout deve executar somente a action de logout', () => {
    const error = new Error('auth/invalid-email');

    const gen = logoutAsync();

    expect(gen.next().value).toEqual(select(authSelectors.isLogged));
    expect(gen.throw(error).value).toEqual(put(authActions.logout()));
  });

  test('deve se registrar, atualizar o nome, enviar o email de verificação e retornar a tela anterior se tudo for bem sucedido', () => {
    const action = authActions.registerEmailPasswordAsync({
      email: 'a@a.a',
      confirmPassword: '123456',
      name: 'aaaa',
      password: '123456',
    });
    const gen = registerEmailPasswordAsync(action);

    expect(gen.next().value).toEqual(put(authActions.setLoading(true)));
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

    expect(gen.next().value).toEqual(call(navigationService.goBack));
    expect(gen.next().value).toEqual(put(authActions.setLoading(false)));
    expect(gen.next().done).toBe(true);
  });

  test('em caso de erro, deve disparar uma notificação informando', () => {
    const action = authActions.registerEmailPasswordAsync({
      email: 'a@a.a',
      confirmPassword: '123456',
      name: 'aaaa',
      password: '123456',
    });
    const gen = registerEmailPasswordAsync(action);

    expect(gen.next().value).toEqual(put(authActions.setLoading(true)));
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

    expect(gen.next().value).toEqual(put(authActions.setLoading(false)));
    expect(gen.next().done).toBe(true);
  });
});
