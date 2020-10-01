import testSchema from '../../testSchema';

import { productListErrors } from '../__mocks__/product-items.mock';

describe('Testando a validação do ProductList', () => {
  test('deve retornar true se todos os valores forem válidos', async () => {
    const mock = {
      name: 'Nome',
      amount: '15',
      qtd: '1',
      unit: { id: 'un', title: '123' },
    };

    const result = await testSchema('productItem', mock);
    expect(result).toEqual(true);
  });

  test('deve retornar um array com erros para valores vazios', async () => {
    const mock = {
      name: '',
      amount: '',
      qtd: '',
    };

    const result = await testSchema('productItem', mock);

    expect(result).toEqual([
      productListErrors.nameRequired,
      productListErrors.amountRequired,
      productListErrors.qtdRequired,
      productListErrors.unitRequired,
    ]);
  });

  test('deve retornar um array com erros de amount e qtd inválidos', async () => {
    const mock = {
      name: 'name',
      qtd: '12,',
      amount: '12.-',
      unit: { id: 'un', title: '123' },
    };

    const result = await testSchema('productItem', mock);

    expect(result).toEqual([
      productListErrors.amountInvalid,
      productListErrors.qtdInvalid,
    ]);
  });

  test('deve retornar um array com erros de amount e qtd muito longos', async () => {
    const mock = {
      name: 'name',
      qtd: '120000000000000000000000',
      amount: '12000000000000000000000',
      unit: { id: 'un', title: '123' },
    };

    const result = await testSchema('productItem', mock);

    expect(result).toEqual([
      productListErrors.amountIsMuchLong,
      productListErrors.qtdIsMuchLong,
    ]);
  });
});
