import { ProductItemBuilderMock } from '@store/product-list/__mocks__/productItemBuilder.mock';

import validateForm from '../';
import { productListErrors } from '../schemas/__mocks__/product-items.mock';

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
      .withUnit({ id: 'id', title: '123' })
      .build();

    const result = await validateForm(mock, 'productItem');

    expect(result).toEqual(productListErrors.resultErrorInvalid);
  });

  test('deve retornar undefined se não possuir erro nenhum', async () => {
    const mock = new ProductItemBuilderMock()
      .withName('Valid Name')
      .withQtd('1')
      .withAmount('23')
      .withBrand('Marca')
      .withUnit({ id: 'un', title: 'Unidade' })
      .build();

    const result = await validateForm(mock, 'productItem');

    expect(result).toEqual(undefined);
  });
});
