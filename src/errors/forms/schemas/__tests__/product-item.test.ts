import { productListErrors } from '../__mocks__/product-items.mock';
import testSchema from '../../testSchema';

describe('Testando a validação do ProductList', () => {
  beforeAll(() => {
    jest.spyOn(Date, 'now').mockReturnValue(1604012169142);
  });

  // should return true if all values are valid
  test('deve retornar true se todos os valores forem válidos', async () => {
    const mock = {
      name: 'Nome',
      amount: '15',
      qtd: '1',
      unit: { id: 'un', title: '123' },
      dueDate: 16040121999999
    };

    const result = await testSchema('productItem', mock);
    expect(result).toEqual(true);
  });

  // should return an array with the errors to empty values
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

  // should return an array with the errors to invalid amount and qtd
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

  // should return an array with errors to amount and qtd much longer
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

  // should return an array with error of date before today
  test('deve retornar um array com erro de data anterior a hoje', async () => {
    const mock = {
      name: 'name',
      qtd: '12',
      amount: '12',
      unit: { id: 'un', title: '123' },
      dueDate: 160401210000,
    };

    const result = await testSchema('productItem', mock);

    expect(result).toEqual([productListErrors.dueDateIsLowerThanToday]);
  });
});
