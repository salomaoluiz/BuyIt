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
  setError: (error?: string): ProductListActions<{ error?: string }> => ({
    type: ProductListTypes.SET_ERROR,
    payload: { error },
  }),
  getProductListsAsync: () => ({
    type: ProductListTypes.GET_PRODUCT_LISTS_ASYNC,
  }),
  createProductListAsync: (
    productList: Partial<ProductList>,
  ): ProductListActions<{ productList: Partial<ProductList> }> => ({
    type: ProductListTypes.CREATE_PRODUCT_LIST_ASYNC,
    payload: { productList },
  }),
  updateProductListAsync: (
    productList: Partial<ProductList>,
  ): ProductListActions<{ productList: Partial<ProductList> }> => ({
    type: ProductListTypes.UPDATE_PRODUCT_LIST_ASYNC,
    payload: { productList },
  }),
  deleteProductListAsync: (
    listId: string,
  ): ProductListActions<{
    listId: string;
  }> => ({
    type: ProductListTypes.DELETE_PRODUCT_LIST_ASYNC,
    payload: { listId },
  }),
  setProductLists: (
    productLists: ProductLists,
  ): ProductListActions<{ productLists: ProductLists }> => ({
    type: ProductListTypes.SET_PRODUCT_LIST,
    payload: { productLists },
  }),
  getProductItemsAsync: (
    listId: string,
  ): ProductListActions<{ listId: string }> => ({
    type: ProductListTypes.GET_PRODUCT_ITEMS_ASYNC,
    payload: { listId },
  }),
  createProductItemAsync: (
    productItem: Partial<ProductItem>,
    listId: string,
  ): ProductListActions<{
    productItem: Partial<ProductItem>;
    listId: string;
  }> => ({
    type: ProductListTypes.CREATE_PRODUCT_ITEM_ASYNC,
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
  updateProductItemAsync: (
    productItem: Partial<ProductItem>,
    listId: string,
  ): ProductListActions<{
    productItem: Partial<ProductItem>;
    listId: string;
  }> => ({
    type: ProductListTypes.UPDATE_PRODUCT_ITEM_ASYNC,
    payload: { productItem, listId },
  }),
};

export default actions;
