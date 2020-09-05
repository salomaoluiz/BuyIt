import {
  ProductListActions,
  ProductListTypes,
  ProductList,
  ProductLists,
  ProductItem,
} from './types';

const actions = {
  setLoading: (
    isLoading: boolean,
  ): ProductListActions<{ isLoading: boolean }> => ({
    type: ProductListTypes.SET_LOADING,
    payload: { isLoading },
  }),
  setError: (error: Error): ProductListActions<{ error: Error }> => ({
    type: ProductListTypes.SET_ERROR,
    payload: { error },
  }),
  setProductListAsync: (
    productList: Partial<ProductList>,
  ): ProductListActions<{ productList: Partial<ProductList> }> => ({
    type: ProductListTypes.SET_PRODUCT_LIST_ASYNC,
    payload: { productList },
  }),
  setProductLists: (
    productLists: ProductLists,
  ): ProductListActions<{ productLists: ProductLists }> => ({
    type: ProductListTypes.SET_PRODUCT_LIST,
    payload: { productLists },
  }),
  setProductItemAsync: (
    productItem: Partial<ProductItem>,
    listId: string,
  ): ProductListActions<{
    productItem: Partial<ProductItem>;
    listId: string;
  }> => ({
    type: ProductListTypes.SET_PRODUCT_ITEM_ASYNC,
    payload: { productItem, listId },
  }),
  deleteProductItemAsync: (
    itemId: string,
    listId: string,
  ): ProductListActions<{
    itemId: string;
    listId: string;
  }> => ({
    type: ProductListTypes.DELETE_PRODUCT_ITEM_ASYNC,
    payload: { itemId, listId },
  }),
  deleteProductListAsync: (
    listId: string,
  ): ProductListActions<{
    listId: string;
  }> => ({
    type: ProductListTypes.DELETE_PRODUCT_LIST_ASYNC,
    payload: { listId },
  }),
};

export default actions;
