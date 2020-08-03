import {
  loginWithEmailPassword,
  registerEmailPassword,
  loginAnonymously,
  logout,
  deleteAccount,
  sendEmailVerification,
} from '../models';
import auth from '@react-native-firebase/auth';
import { mockCurrentUser } from 'src/__tests__/firebase-mocks';

jest.mock('@react-native-firebase/auth', () =>
  jest.fn().mockReturnValue({
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    signInAnonymously: jest.fn(),
    signOut: jest.fn(),
  }),
);

describe('Auth Models', () => {
  test('deve executar o signInWithEmailAndPassword do firebase ', () => {
    const email = 'a@a.a';
    const password = '123456';
    loginWithEmailPassword(email, password);

    expect(auth().signInWithEmailAndPassword).toHaveBeenCalledWith(
      email,
      password,
    );
  });

  test('deve executar o createUserWithEmailAndPassword do firebase ', () => {
    const email = 'a@a.a';
    const password = '123456';
    registerEmailPassword(email, password);

    expect(auth().createUserWithEmailAndPassword).toHaveBeenCalledWith(
      email,
      password,
    );
  });

  test('deve executar o signInAnonymously do firebase ', () => {
    loginAnonymously();

    expect(auth().signInAnonymously).toHaveBeenCalledTimes(1);
  });

  test('deve executar o signOut do firebase ', () => {
    logout();

    expect(auth().signOut).toHaveBeenCalledTimes(1);
  });

  test('deve executar o delete do currentUser ', () => {
    deleteAccount(mockCurrentUser);

    expect(mockCurrentUser.delete).toHaveBeenCalledTimes(1);
  });

  test('deve executar o sendEmailVerification do currentUser ', () => {
    sendEmailVerification(mockCurrentUser);

    expect(mockCurrentUser.sendEmailVerification).toHaveBeenCalledTimes(1);
  });
});
