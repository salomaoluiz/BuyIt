import { AppStateMockBuilder } from '@store/__mocks__/AppStateMockBuilder.mock';
import { mockCurrentUser } from 'src/__tests__/firebase-mocks';

import { authSelectors } from '../';

describe('Testando AuthSelectors', () => {
  test('deve retornar o state correto', () => {
    const mockData = new AppStateMockBuilder()
      .withAuth({
        isAnonymously: false,
        isLoading: false,
        isLogged: true,
        email: '',
      })
      .build();
    const response = authSelectors.getState(mockData);

    expect(response).toEqual(mockData.authReducer);
  });

  test('deve retornar o user ID corretamente', () => {
    const mockData = new AppStateMockBuilder()
      .withAuth({
        currentUser: {
          ...mockCurrentUser,
          uid: '123456',
        },
        isAnonymously: false,
        isLoading: false,
        isLogged: true,
        email: '',
      })
      .build();

    const response = authSelectors.getUserId(mockData);

    expect(response).toEqual(mockData.authReducer.currentUser?.uid);
  });

  test('deve retornar se esta logado corretamente', () => {
    const mockData = new AppStateMockBuilder()
      .withAuth({
        isAnonymously: false,
        isLoading: false,
        isLogged: true,
        email: '',
      })
      .build();

    const response = authSelectors.isLogged(mockData);

    expect(response).toEqual(mockData.authReducer.isLogged);
  });

  test('deve retornar o estado do loading corretamente', () => {
    const mockData = new AppStateMockBuilder()
      .withAuth({
        isAnonymously: false,
        isLoading: false,
        isLogged: true,
        email: '',
      })
      .build();

    const response = authSelectors.isLoading(mockData);

    expect(response).toEqual(mockData.authReducer.isLoading);
  });

  test('deve retornar se está logado anonimamente corretamente', () => {
    const mockData = new AppStateMockBuilder()
      .withAuth({
        isAnonymously: false,
        isLoading: false,
        isLogged: true,
        email: '',
      })
      .build();

    const response = authSelectors.isAnonymously(mockData);

    expect(response).toEqual(mockData.authReducer.isAnonymously);
  });
});
