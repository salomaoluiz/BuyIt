import { PaperListData } from '@components/list';

export enum ProductListTypes {
  SET_ERROR = '@productLists/SET_ERROR',
  SET_SYNCED = '@productLists/SET_SYNCED',

  REQUEST_LISTS = '@productLists/REQUEST_LISTS',
  CREATE_LIST = '@productLists/CREATE_LIST',
  UPDATE_LIST = '@productLists/UPDATE_LIST',
  DELETE_LIST = '@productLists/DELETE_LIST',

  REQUEST_ITEMS = '@productLists/REQUEST_ITEMS',
  CREATE_ITEM = '@productLists/CREATE_ITEM',
  UPDATE_ITEM = '@productLists/UPDATE_ITEM',
  DELETE_ITEM = '@productLists/DELETE_ITEM',

  SET_PRODUCT_LISTS = '@productLists/SET_PRODUCT_LISTS',
}

export type ProductItemForm = {
  name: string;
  amount: string;
  qtd: string;
  brand: string;
  unit: PaperListData;
  dueDate?: number;
  createdAt: number;
  updatedAt: number;
  image?: string;
  barcode?: string;
};

export interface ProductItem extends ProductItemForm {
  id: string;
  checkState?: boolean;
}

export type ProductListForm = {
  name: string;
  buyDate?: number;
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

export type ProductListAction<Payload> = {
  type: ProductListTypes;
  payload: Payload;
};

export type ProductListReducer = (
  state: ProductListState,
  payload: ProductListAction<ProductListState>,
) => ProductListState;
