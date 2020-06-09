import { SET_ITEMS_DATA } from './constants';

export type ItemsData = {
  id: string;
  name: string;
  amount: string;
	qtd: string;
	brand: string;
};

export type ItemsDataArray = Array<ItemsData>;

export interface ItemsReducerState {
  itemsData: ItemsDataArray;
}

interface SetItems {
  type: typeof SET_ITEMS_DATA;
  payload: { itemsData: ItemsData[] };
}

export type ItemsActions = SetItems;
