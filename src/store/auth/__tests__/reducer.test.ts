import { mockCurrentUser } from 'src/__tests__/firebase-mocks';

import { authActions } from '../';
import authReducer from '../reducer';
import { AuthAction, AuthState, AuthTypes } from '../types';

describe('Auth Reducer', () => {
  const initialState: AuthState = {
    isLogged: false,
    isLoading: false,
    isAnonymously: false,
    email: '',
    currentUser: undefined,
  };

  test.each([
    ['any', { type: 'any' as AuthTypes }, initialState],
    ['logout', authActions.logout(), initialState],
    [
      'login',
      authActions.login(mockCurrentUser),
      { isLogged: true, isLoading: false, currentUser: mockCurrentUser },
    ],
    [
      'requestLoginEmailPassword',
      authActions.requestLoginEmailPassword('email', 'pass'),
      { isLoading: true, error: undefined },
    ],
    [
      'requestLoginAnonymously',
      authActions.requestLoginAnonymously(),
      { isLoading: false, isAnonymously: true },
    ],
    [
      'requestRegisterEmailPassword',
      authActions.requestRegisterEmailPassword({
        email: 'email',
        name: 'name',
        password: 'pass',
        confirmPassword: 'pass',
      }),
      { isLogged: false, isLoading: true, error: undefined },
    ],
    [
      'registerSuccess',
      authActions.registerSuccess(),
      { isLogged: false, isLoading: false, error: undefined },
    ],
    [
      'authError',
      authActions.authError(new Error('error')),
      { isLoading: false, error: new Error('error') },
    ],
  ] as Array<[string, AuthAction<AuthState>, AuthState]>)(
    'Deve executar corretamente o reducer para a action %s',
    (description, action, expected) => {
      const response = authReducer(initialState, action);

      expect(response).toEqual({ ...initialState, ...expected });
    },
  );
});
