export enum ProductListTypes {
  SET_LOADING = '@productLists/SET_LOADING',
  SET_ERROR = '@productLists/SET_ERROR',
  SET_PRODUCT_LIST_ASYNC = '@productLists/SET_PRODUCT_LIST_ASYNC',
  SET_PRODUCT_LIST = '@productLists/SET_PRODUCT_LIST',
  SET_PRODUCT_ITEM_ASYNC = '@productLists/SET_PRODUCT_ITEM_ASYNC',
  SET_PRODUCT_ITEM = '@productLists/SET_PRODUCT_ITEM',
  DELETE_PRODUCT_LIST_ASYNC = '@productLists/DELETE_PRODUCT_LIST_ASYNC',
  DELETE_PRODUCT_ITEM_ASYNC = '@productLists/DELETE_PRODUCT_ITEM_ASYNC',
}

export type ProductItemForm = {
  name: string;
  amount: string;
  qtd: string;
  brand: string;
  unit: string;
};

export interface ProductItem extends ProductItemForm {
  id: string;
}

export type ProductListForm = {
  name: string;
};
export interface ProductList extends ProductListForm {
  id: string;
  items: ProductItems;
}

export type ProductLists = Array<ProductList>;
export type ProductItems = Array<ProductItem>;

export interface ProductListState {
  isLoading: boolean;
  productLists: ProductLists;
  error?: Error;
}

export type ProductListActions<Payload> = {
  type: ProductListTypes;
  payload: Payload;
};

export type ProductListReducer = (
  state: ProductListState,
  payload: ProductListActions<ProductListState>,
) => ProductListState;
