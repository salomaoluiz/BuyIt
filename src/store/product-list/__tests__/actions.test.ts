import { productListActions } from '../';
import { ProductItemBuilderMock } from '../__mocks__/productItemBuilder.mock';
import { ProductListBuilderMock } from '../__mocks__/productListBuilder.mock';
import { ProductListTypes } from '../types';

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
    const result = productListActions.setError(mockError.message);

    expect(result).toEqual({
      type: ProductListTypes.SET_ERROR,
      payload: {
        error: 'teste',
      },
    });
  });

  test('deve retornar getProductListsAsync corretamente.', () => {
    const result = productListActions.getProductListsAsync();

    expect(result).toEqual({
      type: ProductListTypes.GET_PRODUCT_LISTS_ASYNC,
    });
  });

  test('deve retornar createProductListAsync corretamente.', () => {
    const mockData = new ProductListBuilderMock().withName('Lista').build();

    const result = productListActions.createProductListAsync(mockData);

    expect(result).toEqual({
      type: ProductListTypes.CREATE_PRODUCT_LIST_ASYNC,
      payload: {
        productList: mockData,
      },
    });
  });

  test('deve retornar updateProductListAsync corretamente.', () => {
    const mockData = new ProductListBuilderMock().withName('Lista').build();

    const result = productListActions.updateProductListAsync(mockData);

    expect(result).toEqual({
      type: ProductListTypes.UPDATE_PRODUCT_LIST_ASYNC,
      payload: {
        productList: mockData,
      },
    });
  });

  test('deve retornar deleteProductListAsync corretamente.', () => {
    const result = productListActions.deleteProductListAsync('12345');

    expect(result).toEqual({
      type: ProductListTypes.DELETE_PRODUCT_LIST_ASYNC,
      payload: {
        listId: '12345',
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

  test('deve retornar getProductItemsAsync corretamente.', () => {
    const listId = '12345';
    const result = productListActions.getProductItemsAsync(listId);

    expect(result).toEqual({
      type: ProductListTypes.GET_PRODUCT_ITEMS_ASYNC,
      payload: {
        listId,
      },
    });
  });

  test('deve retornar createProductItemAsync corretamente.', () => {
    const mockData = new ProductItemBuilderMock().withName('Lista').build();
    const listId = '12345';
    const result = productListActions.createProductItemAsync(mockData, listId);

    expect(result).toEqual({
      type: ProductListTypes.CREATE_PRODUCT_ITEM_ASYNC,
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

  test('deve retornar updateProductItemAsync corretamente.', () => {
    const productItem = new ProductItemBuilderMock().withName('Lista').build();
    const listId = '12345';
    const result = productListActions.updateProductItemAsync(
      productItem,
      listId,
    );

    expect(result).toEqual({
      type: ProductListTypes.UPDATE_PRODUCT_ITEM_ASYNC,
      payload: {
        listId,
        productItem,
      },
    });
  });
});
