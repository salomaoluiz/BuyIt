import { PaperListData } from '@components/list';

export enum ProductListTypes {
  SET_LOADING = '@productLists/SET_LOADING',
  SET_ERROR = '@productLists/SET_ERROR',
  SET_SYNCED = '@productLists/SET_SYNCED',

  CREATE_PRODUCT_LIST_ASYNC = '@productLists/CREATE_PRODUCT_LIST_ASYNC',
  GET_PRODUCT_LISTS_ASYNC = '@productLists/GET_PRODUCT_LISTS_ASYNC',
  UPDATE_PRODUCT_LIST_ASYNC = '@productLists/UPDATE_PRODUCT_LIST_ASYNC',
  DELETE_PRODUCT_LIST_ASYNC = '@productLists/DELETE_PRODUCT_LIST_ASYNC',

  CREATE_PRODUCT_ITEM_ASYNC = '@productLists/CREATE_PRODUCT_ITEM_ASYNC',
  GET_PRODUCT_ITEMS_ASYNC = '@productLists/GET_PRODUCT_ITEMS_ASYNC',
  UPDATE_PRODUCT_ITEM_ASYNC = '@productLists/UPDATE_PRODUCT_ITEM_ASYNC',
  DELETE_PRODUCT_ITEM_ASYNC = '@productLists/DELETE_PRODUCT_ITEM_ASYNC',

  SET_PRODUCT_LIST = '@productLists/SET_PRODUCT_LIST',
}

export type ProductItemForm = {
  name: string;
  amount: string;
  qtd: string;
  brand: string;
  unit?: PaperListData;
  dueDate?: Date;
  createdAt: number;
  updatedAt: number;
  image?: string;
};

export interface ProductItem extends ProductItemForm {
  id: string;
  checkState?: boolean;
}

export type ProductListForm = {
  name: string;
};
export interface ProductList extends ProductListForm {
  id: string;
  createdAt: number;
  updatedAt: number;
  items: ProductItems;
}

export type ProductLists = Array<ProductList>;
export type ProductItems = Array<ProductItem>;

export interface ProductListState {
  isLoading: boolean;
  productLists: ProductLists;
  error?: string;
}

export type ProductListActions<Payload> = {
  type: ProductListTypes;
  payload: Payload;
};

export type ProductListReducer = (
  state: ProductListState,
  payload: ProductListActions<ProductListState>,
) => ProductListState;
