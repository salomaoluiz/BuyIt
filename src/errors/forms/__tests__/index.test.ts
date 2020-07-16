import { validateForm } from '..';
import { productListErrors } from '../__mocks__/product-list';

describe('Testando todo o fluxo de erros de formulários', () => {
  it('deve retornar o objeto de erro formatado para o productList se os valores forem vazios', async () => {
    const mock = {
      name: '',
      amount: '',
      qtd: '',
    };

    const result = await validateForm(mock, 'productList');

    expect(result).toEqual(productListErrors.resultErrorRequired);
  });

  it('deve retornar o objeto de erro formatado para o productList se os valores forem inválidos', async () => {
    const mock = {
      name: 'Name',
      amount: '12;.;',
      qtd: '12-',
    };

    const result = await validateForm(mock, 'productList');

    expect(result).toEqual(productListErrors.resultErrorInvalid);
  });
});
