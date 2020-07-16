import { productListActions } from '..';
import { ProductListTypes } from '../types';

describe('ListItems Actions', () => {
  it('deve retornar a action com o type e payload corretamente.', () => {
    const mockData = [
      { id: '1', brand: '', name: 'name', amount: '1.5', qtd: '13', unit: 'g' },
    ];

    const result = productListActions.setProductList(mockData);

    expect(result).toEqual({
      type: ProductListTypes.SET_ITEMS_DATA,
      payload: {
        productList: mockData,
      },
    });
  });
});
