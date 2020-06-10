import productList from '../product-list';

import { productListErrors } from '../__mocks__/product-list';

describe('Testando a validação do ProductList', () => {
  it('deve retornar true se todos os valores forem válidos', async () => {
    const mock = {
      name: 'Nome',
      amount: '15',
      qtd: '1',
    };

    const result = await productList(mock);
    expect(result).toEqual(true);
  });

  it('deve retornar um array com erros para valores vazios', async () => {
    const mock = {
      name: '',
      amount: '',
      qtd: '',
    };

    const result = await productList(mock);

    expect(result).toEqual([
      productListErrors.nameRequired,
      productListErrors.amountRequired,
      productListErrors.qtdRequired,
    ]);
  });

  it('deve retornar um array com erros de amount e qtd inválidos', async () => {
    const mock = {
      name: 'name',
      qtd: '12,',
      amount: '12.-',
    };

    const result = await productList(mock);

    expect(result).toEqual([
      productListErrors.amountInvalid,
      productListErrors.qtdInvalid,
    ]);
  });
});
