import { ProductItems } from '@store/product-list/types';

export enum StockTypes {
  REQUEST_STOCK = '@stock/REQUEST_STOCK',
  CREATE_ITEM = '@stock/CREATE_ITEM',
  UPDATE_ITEM = '@stock/UPDATE_ITEM',
  DELETE_ITEM = '@stock/DELETE_ITEM',

  SET_ERROR = '@stock/SET_ERROR',
  SET_STOCK = '@stock/SET_STOCK',
}

export interface StockState {
  isLoading: boolean;
  stock: ProductItems;
  error?: string;
}

export type StockAction<Payload> = {
  type: StockTypes;
  payload: Payload;
};

export type StockReducer = (
  state: StockState,
  payload: StockAction<StockState>,
) => StockState;
