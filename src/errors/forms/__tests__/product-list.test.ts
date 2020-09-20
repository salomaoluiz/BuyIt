import productList from '../product-list';

import * as productListErrors from '../__mocks__/product-list.mock';

describe('Testando a validação do ProductList', () => {
  test('deve retornar true se todos os valores forem válidos', async () => {
    const mock = {
      name: 'foo',
    };

    const result = await productList(mock);
    expect(result).toEqual(true);
  });

  test('deve retornar um array com erros para valores vazios', async () => {
    const mock = {
      name: '',
    };

    const result = await productList(mock);

    expect(result).toEqual([productListErrors.nameRequired]);
  });

  test('deve retornar um array com erros para valor muito longo', async () => {
    const mock = {
      name:
        'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    };

    const result = await productList(mock);

    expect(result).toEqual([productListErrors.nameIsMuchLong]);
  });
});
