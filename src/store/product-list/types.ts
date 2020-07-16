import { GeneralActions } from '@store/general/types';

export enum ProductListTypes {
  SET_ITEMS_DATA = 'SET_ITEMS_DATA',
}

export type ProductItem = {
  id: string;
  name: string;
  amount: string;
  qtd: string;
  brand: string;
  unit: string;
};

export type ProductList = Array<ProductItem>;

export interface ProductListState {
  productList: ProductList;
}

export type ProductListActions<Payload> = {
  type: ProductListTypes;
  payload: Payload;
};

export type ProductListReducer = (
  state: ProductListState,
  payload: GeneralActions<ProductListState>,
) => ProductListState;
