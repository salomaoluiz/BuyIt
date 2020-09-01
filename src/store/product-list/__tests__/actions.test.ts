import { productListActions } from '..';
import { ProductListTypes } from '../types';
import { ProductListBuilderMock } from '../__mocks__/productListBuilderMock';
import { ProductItemBuilderMock } from '../__mocks__/productItemBuilderMock';

describe('ProductList Actions', () => {
  test('deve retornar setLoading corretamente.', () => {
    const result = productListActions.setLoading(true);

    expect(result).toEqual({
      type: ProductListTypes.SET_LOADING,
      payload: {
        isLoading: true,
      },
    });
  });

  test('deve retornar setError corretamente.', () => {
    const mockError = new Error('teste');
    const result = productListActions.setError(mockError);

    expect(result).toEqual({
      type: ProductListTypes.SET_ERROR,
      payload: {
        error: mockError,
      },
    });
  });

  test('deve retornar setProductListAsync corretamente.', () => {
    const mockData = new ProductListBuilderMock().withName('Lista').build();

    const result = productListActions.setProductListAsync(mockData);

    expect(result).toEqual({
      type: ProductListTypes.SET_PRODUCT_LIST_ASYNC,
      payload: {
        productList: mockData,
      },
    });
  });

  test('deve retornar setProductLists corretamente.', () => {
    const mockData = [new ProductListBuilderMock().withName('Lista').build()];

    const result = productListActions.setProductLists(mockData);

    expect(result).toEqual({
      type: ProductListTypes.SET_PRODUCT_LIST,
      payload: {
        productLists: mockData,
      },
    });
  });

  test('deve retornar setProductItemAsync corretamente.', () => {
    const mockData = new ProductItemBuilderMock().withName('Lista').build();
    const listId = '12345';
    const result = productListActions.setProductItemAsync(mockData, listId);

    expect(result).toEqual({
      type: ProductListTypes.SET_PRODUCT_ITEM_ASYNC,
      payload: {
        productItem: mockData,
        listId,
      },
    });
  });

  test('deve retornar deleteProductItemAsync corretamente.', () => {
    const itemId = '54321';
    const listId = '12345';
    const result = productListActions.deleteProductItemAsync(itemId, listId);

    expect(result).toEqual({
      type: ProductListTypes.DELETE_PRODUCT_ITEM_ASYNC,
      payload: {
        itemId,
        listId,
      },
    });
  });

  test('deve retornar deleteProductListAsync corretamente.', () => {
    const listId = '12345';
    const result = productListActions.deleteProductListAsync(listId);

    expect(result).toEqual({
      type: ProductListTypes.DELETE_PRODUCT_LIST_ASYNC,
      payload: {
        listId,
      },
    });
  });
});
