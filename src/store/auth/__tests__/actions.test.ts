import { authActions } from '../';
import { AuthTypes, AuthRegisterForm } from '../types';
import { mockCurrentUser } from 'src/__tests__/firebase-mocks';
describe('Auth Actions', () => {
  test('deve executar setLoading corretamente', () => {
    const action = authActions.setLoading(true);

    expect(action.type).toEqual(AuthTypes.SET_LOADING);
    expect(action.payload.isLoading).toEqual(true);
  });

  test('deve executar logout corretamente', () => {
    const action = authActions.logout();

    expect(action.type).toEqual(AuthTypes.LOGOUT);
  });

  test('deve executar logoutAsync corretamente', () => {
    const action = authActions.logoutAsync();

    expect(action.type).toEqual(AuthTypes.LOGOUT_ASYNC);
  });

  test('deve executar login corretamente', () => {
    const action = authActions.login(mockCurrentUser);

    expect(action.type).toEqual(AuthTypes.LOGIN);
    expect(action.payload.currentUser).toEqual(mockCurrentUser);
  });

  test('deve executar loginEmailPasswordAsync corretamente', () => {
    const action = authActions.loginEmailPasswordAsync('a@a.a', '123456');

    expect(action.type).toEqual(AuthTypes.LOGIN_EMAIL_PASSWORD_ASYNC);
    expect(action.payload).toEqual({ email: 'a@a.a', password: '123456' });
  });

  test('deve executar loginAnonymously corretamente', () => {
    const action = authActions.loginAnonymously(true);

    expect(action.type).toEqual(AuthTypes.LOGIN_ANONYMOUSLY);
    expect(action.payload).toEqual({ isOnline: true });
  });

  test('deve executar registerEmailPasswordAsync corretamente', () => {
    const userData: AuthRegisterForm = {
      email: 'a@a.a',
      password: '123456',
      confirmPassword: '123456',
      name: 'aa',
    };
    const action = authActions.registerEmailPasswordAsync(userData);

    expect(action.type).toEqual(AuthTypes.REGISTER_EMAIL_PASSWORD_ASYNC);
    expect(action.payload).toEqual(userData);
  });
});
