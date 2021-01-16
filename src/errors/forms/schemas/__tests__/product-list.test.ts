import * as productListErrors from '../__mocks__/product-list.mock';
import testSchema from '../../testSchema';

describe('Testando a validação do ProductList', () => {
  // should return true if all the values are valid
  test('deve retornar true se todos os valores forem válidos', async () => {
    const mock = {
      name: 'foo',
    };

    const result = await testSchema('productList', mock);
    expect(result).toEqual(true);
  });

  // should return a array with errors to empty values
  test('deve retornar um array com erros para valores vazios', async () => {
    const mock = {
      name: '',
    };

    const result = await testSchema('productList', mock);

    expect(result).toEqual([productListErrors.nameRequired]);
  });

  // should return an array with errors to value much longer
  test('deve retornar um array com erros para valor muito longo', async () => {
    const mock = {
      name:
        'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    };

    const result = await testSchema('productList', mock);

    expect(result).toEqual([productListErrors.nameIsMuchLong]);
  });
});
