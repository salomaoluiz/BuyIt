import validateForm from '..';
import { productListErrors } from '../__mocks__/product-items.mock';
import { ProductItemBuilderMock } from '@store/product-list/__mocks__/productItemBuilderMock';

describe('Testando todo o fluxo de erros de formulários', () => {
  test('deve retornar o objeto de erro formatado para o productItem se os valores forem vazios', async () => {
    const mock = new ProductItemBuilderMock()
      .withName('')
      .withAmount('')
      .withQtd('')
      .build();

    const result = await validateForm(mock, 'productItem');

    expect(result).toEqual(productListErrors.resultErrorRequired);
  });

  test('deve retornar o objeto de erro formatado para o productItem se os valores forem inválidos', async () => {
    const mock = new ProductItemBuilderMock()
      .withName('Valid Name')
      .withQtd('1;.9')
      .withAmount('23s[')
      .build();

    const result = await validateForm(mock, 'productItem');

    expect(result).toEqual(productListErrors.resultErrorInvalid);
  });
});
