import { authSelectors } from '../';
import { mockReducerInitialState } from 'src/__tests__/mocks';

describe('Testando AuthSelectors', () => {
  test('deve retornar o state correto', () => {
    const response = authSelectors.getState(mockReducerInitialState);

    expect(response).toEqual(mockReducerInitialState.authReducer);
  });
});
