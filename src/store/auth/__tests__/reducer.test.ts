import authReducer from '../reducer';
import { AuthState } from '../types';
import { authActions } from '..';
import { mockCurrentUser } from 'src/__tests__/firebase-mocks';

describe('Auth Reducer', () => {
  const initialState: AuthState = {
    isLoggedIn: false,
    isAnonymously: false,
    isOnline: false,
    isLoading: false,
    email: '',
    currentUser: undefined,
  };

  test('deve retornar o state para uma action nao mapeada', () => {
    const action = { type: 'any', payload: {} };

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const response = authReducer(initialState, action);

    expect(response).toEqual(initialState);
  });

  test('deve corretamente para a action setLoading', () => {
    const action = authActions.setLoading(true);

    const response = authReducer(initialState, action);

    expect(response).toEqual({ ...initialState, isLoading: true });
  });

  test('deve corretamente para a action logout', () => {
    const action = authActions.logout();

    const response = authReducer(initialState, action);

    expect(response).toEqual(initialState);
  });

  test('deve corretamente para a action login', () => {
    const action = authActions.login(mockCurrentUser);

    const response = authReducer(initialState, action);

    expect(response).toEqual({
      ...initialState,
      currentUser: mockCurrentUser,
    });
  });

  test('deve corretamente para a action loginEmailPassword', () => {
    const action = authActions.loginEmailPassword();

    const response = authReducer(initialState, action);

    expect(response).toEqual({
      ...initialState,
      isLoggedIn: true,
      isOnline: true,
    });
  });

  test('deve corretamente para a action loginAnonymously quando está online', () => {
    const action = authActions.loginAnonymously(true);

    const response = authReducer(initialState, action);

    expect(response).toEqual({
      ...initialState,
      isLoggedIn: true,
      isOnline: true,
      isAnonymously: true,
    });
  });

  test('deve corretamente para a action loginAnonymously quando está offline', () => {
    const action = authActions.loginAnonymously(false);

    const response = authReducer(initialState, action);

    expect(response).toEqual({
      ...initialState,
      isLoggedIn: true,
      isOnline: false,
      isAnonymously: true,
    });
  });
});
