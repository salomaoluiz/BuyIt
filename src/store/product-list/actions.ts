import {
  ProductListAction,
  ProductListTypes,
  ProductList,
  ProductLists,
  ProductItem,
} from './types';

const actions = {
  setError: (error?: string): ProductListAction<{ error?: string }> => ({
    type: ProductListTypes.SET_ERROR,
    payload: { error },
  }),
  requestLists: () => ({
    type: ProductListTypes.REQUEST_LISTS,
  }),
  createList: (
    productList: Partial<ProductList>,
  ): ProductListAction<{ productList: Partial<ProductList> }> => ({
    type: ProductListTypes.CREATE_LIST,
    payload: { productList },
  }),
  updateList: (
    productList: Partial<ProductList>,
  ): ProductListAction<{ productList: Partial<ProductList> }> => ({
    type: ProductListTypes.UPDATE_LIST,
    payload: { productList },
  }),
  deleteList: (
    listId: string,
  ): ProductListAction<{
    listId: string;
  }> => ({
    type: ProductListTypes.DELETE_LIST,
    payload: { listId },
  }),
  setProductLists: (
    productLists: ProductLists,
  ): ProductListAction<{ productLists: ProductLists }> => ({
    type: ProductListTypes.SET_PRODUCT_LISTS,
    payload: { productLists },
  }),
  createItem: (
    productItem: Partial<ProductItem>,
    listId: string,
  ): ProductListAction<{
    productItem: Partial<ProductItem>;
    listId: string;
  }> => ({
    type: ProductListTypes.CREATE_ITEM,
    payload: { productItem, listId },
  }),
  deleteItem: (
    itemId: string,
    listId: string,
  ): ProductListAction<{
    itemId: string;
    listId: string;
  }> => ({
    type: ProductListTypes.DELETE_ITEM,
    payload: { itemId, listId },
  }),
  updateItem: (
    productItem: Partial<ProductItem>,
    listId: string,
  ): ProductListAction<{
    productItem: Partial<ProductItem>;
    listId: string;
  }> => ({
    type: ProductListTypes.UPDATE_ITEM,
    payload: { productItem, listId },
  }),
};

export default actions;
