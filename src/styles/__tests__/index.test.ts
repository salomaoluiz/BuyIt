import { getStyleAsNumber } from '@styles';

describe('Styles - Funções Uteis', () => {
  test('deve obter um style do styled-components e retornar apenas o numero', () => {
    const response = getStyleAsNumber('15px');

    expect(response).toEqual(15);
  });
});
