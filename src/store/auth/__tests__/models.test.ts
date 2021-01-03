import auth from '@react-native-firebase/auth';

import { mockCurrentUser } from 'src/__tests__/firebase-mocks';

import * as models from '../models';

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
    models.loginWithEmailPassword(email, password);

    expect(auth().signInWithEmailAndPassword).toHaveBeenCalledWith(
      email,
      password,
    );
  });

  test('deve executar o createUserWithEmailAndPassword do firebase ', () => {
    const email = 'a@a.a';
    const password = '123456';
    models.registerEmailPassword(email, password);

    expect(auth().createUserWithEmailAndPassword).toHaveBeenCalledWith(
      email,
      password,
    );
  });

  test('deve executar o signOut do firebase ', () => {
    models.logout();

    expect(auth().signOut).toHaveBeenCalledTimes(1);
  });

  test('deve executar o delete do currentUser ', () => {
    models.deleteAccount(mockCurrentUser);

    expect(mockCurrentUser.delete).toHaveBeenCalledTimes(1);
  });

  test('deve executar o sendEmailVerification do currentUser ', () => {
    models.sendEmailVerification(mockCurrentUser);

    expect(mockCurrentUser.sendEmailVerification).toHaveBeenCalledTimes(1);
  });

  test('deve atualizar os dados do usuario ', () => {
    const newUser = 'New Username';
    models.updateUserProfile(mockCurrentUser, newUser);

    expect(mockCurrentUser.updateProfile).toHaveBeenCalledWith({
      displayName: newUser,
    });
  });
});
