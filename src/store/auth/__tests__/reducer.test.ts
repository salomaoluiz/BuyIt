// @ts-nocheck

import authReducer from '../reducer';
import { authActions } from '..';
import { mockCurrentUser } from 'src/__tests__/firebase-mocks';

describe('Auth Reducer', () => {
  const initialState = {
    isLogged: false,
    isOnline: false,
    isLoading: false,
    isAnonymously: false,
    email: '',
    currentUser: undefined,
  };

  test('deve retornar o state para uma action nao mapeada', () => {
    const action = { type: 'any', payload: {} };

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
      isOnline: true,
      isLogged: true,
      currentUser: mockCurrentUser,
    });
  });

  test('deve corretamente para a action loginAnonymously quando está offline', () => {
    const action = authActions.loginAnonymously(false);

    const response = authReducer(initialState, action);

    expect(response).toEqual({
      ...initialState,
      isOnline: false,
      isAnonymously: true,
    });
  });
});
