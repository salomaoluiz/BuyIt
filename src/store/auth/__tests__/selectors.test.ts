import { authSelectors } from '../';
import { AppStateMockBuilder } from '@store/__mocks__/AppStateMockBuilder';

describe('Testando AuthSelectors', () => {
  test('deve retornar o state correto', () => {
    const mockData = new AppStateMockBuilder()
      .withAuth({ isOnline: true })
      .build();
    const response = authSelectors.getState(mockData);

    expect(response).toEqual(mockData.authReducer);
  });
});
