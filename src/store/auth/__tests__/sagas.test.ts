import { authModels, authActions, authSelectors } from '../';
import { mockCurrentUser } from 'src/__tests__/firebase-mocks';
import { loginEmailPasswordAsync } from '../sagas';
import { AuthTypes } from '../types';
import { put, call, select } from 'redux-saga/effects';
import { notificationActions } from '@store/notification';
import errorsString from '@locales/general-errors';
describe('Auth Saga - Login com Email e Senha', () => {
  const mockLoginWithEmailPassword = jest.spyOn(
    authModels,
    'loginWithEmailPassword',
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('deve logar corretamente se os dados estiverem corretos', async () => {
    mockLoginWithEmailPassword.mockResolvedValue({ user: mockCurrentUser });
    const mockProps = {
      type: AuthTypes.LOGIN_EMAIL_PASSWORD_ASYNC,
      payload: {
        email: 'a@a.a',
        password: '123456',
      },
    };
    const gen = loginEmailPasswordAsync(mockProps);

    expect(await gen.next().value).toEqual(select(authSelectors.getState));
    expect(
      await gen.next({ isLoggedIn: true, user: mockCurrentUser }).value,
    ).toEqual(put(authActions.setLoading(true)));

    expect(await gen.next().value).toEqual(
      call(
        authModels.loginWithEmailPassword,
        mockProps.payload.email,
        mockProps.payload.password,
      ),
    );

    expect(
      await gen.next({ user: mockCurrentUser, isLoggedIn: true }).value,
    ).toEqual(put(authActions.login(mockCurrentUser)));

    expect(await gen.next().value).toEqual(
      put(authActions.loginEmailPassword()),
    );

    expect(await gen.next().value).toEqual(put(authActions.setLoading(false)));

    expect(await gen.next().done).toBe(true);
  });

  test('deve apresentar uma notificação caso dê erro', async () => {
    mockLoginWithEmailPassword.mockRejectedValue(
      new Error('auth/invalid-email'),
    );

    const mockProps = {
      type: AuthTypes.LOGIN_EMAIL_PASSWORD_ASYNC,
      payload: {
        email: 'a@a.a',
        password: '123456',
      },
    };
    const gen = loginEmailPasswordAsync(mockProps);
    expect(await gen.next().value).toEqual(select(authSelectors.getState));
    expect(
      await gen.next({ isLoggedIn: true, user: mockCurrentUser }).value,
    ).toEqual(put(authActions.setLoading(true)));

    expect(await gen.next().value).toEqual(
      call(
        authModels.loginWithEmailPassword,
        mockProps.payload.email,
        mockProps.payload.password,
      ),
    );

    const notificationParams = {
      title: errorsString.generalErrors.opsWeHaveAProblem,
      body: errorsString.generalErrors.tryAgainLater,
    };

    expect(await gen.next().value).toEqual(
      put(notificationActions.sendNotificationAsync(notificationParams)),
    );

    expect(await gen.next().value).toEqual(put(authActions.setLoading(false)));
    expect(await gen.next().done).toBe(true);
  });
});
