import { ProductItems } from '@store/product-list/types';

export enum StockTypes {
  GET_STOCK_ASYNC = '@stock/GET_STOCK_ASYNC',
  CREATE_ITEM_ASYNC = '@stock/CREATE_ITEM_ASYNC',
  UPDATE_ITEM_ASYNC = '@stock/UPDATE_ITEM_ASYNC',
  DELETE_ITEM_ASYNC = '@stock/DELETE_ITEM_ASYNC',

  SET_LOADING = '@stock/SET_LOADING',
  SET_ERROR = '@stock/SET_ERROR',
  SET_STOCK = '@stock/SET_STOCK',

}

export interface StockState {
  isLoading: boolean;
  stock: ProductItems;
  error?: string;
}

export type StockActions<Payload> = {
  type: StockTypes;
  payload: Payload;
};

export type StockReducer = (
  state: StockState,
  payload: StockActions<StockState>,
) => StockState;
