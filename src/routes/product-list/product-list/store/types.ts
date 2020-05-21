import { SET_ITEMS_DATA } from './constants';

export type ItemsData = {
  key: string;
  name: string;
  value: string;
  qtd: string;
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
