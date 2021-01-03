import { mockCurrentUser } from 'src/__tests__/firebase-mocks';

import { authActions } from '../';
import { AuthTypes } from '../types';

describe('Auth Actions', () => {
  test.each([
    ['logout', authActions.logout(), { type: AuthTypes.LOGOUT }],
    [
      'requestLogout',
      authActions.requestLogout(),
      { type: AuthTypes.REQUEST_LOGOUT },
    ],
    [
      'login',
      authActions.login(mockCurrentUser),
      { type: AuthTypes.LOGIN, payload: { currentUser: mockCurrentUser } },
    ],
    [
      'requestLoginEmailPassword',
      authActions.requestLoginEmailPassword('email', 'pass'),
      {
        type: AuthTypes.REQUEST_LOGIN_EMAIL_PASSWORD,
        payload: { email: 'email', password: 'pass' },
      },
    ],
    [
      'requestLoginAnonymously',
      authActions.requestLoginAnonymously(),
      { type: AuthTypes.REQUEST_LOGIN_ANONYMOUSLY },
    ],
    [
      'requestRegisterEmailPassword',
      authActions.requestRegisterEmailPassword({
        email: 'email',
        name: 'name',
        password: 'pass',
        confirmPassword: 'pass',
      }),
      {
        type: AuthTypes.REQUEST_REGISTER_EMAIL_PASSWORD,
        payload: {
          email: 'email',
          name: 'name',
          password: 'pass',
          confirmPassword: 'pass',
        },
      },
    ],
    [
      'registerSuccess',
      authActions.registerSuccess(),
      { type: AuthTypes.REGISTER_SUCCESS },
    ],
    [
      'authError',
      authActions.authError(new Error('error')),
      { type: AuthTypes.AUTH_ERROR, payload: { error: new Error('error') } },
    ],
  ])(
    'Deve executar corretamente a action %s',
    (description, action, expected) => {
      expect(action).toEqual(expected);
    },
  );
});
