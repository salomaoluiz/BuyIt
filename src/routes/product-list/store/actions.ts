import { ItemsData, ItemsActions } from './types';
import { SET_ITEMS_DATA } from './constants';

export const setItemsData = (itemsData: ItemsData[]): ItemsActions => ({
	type: SET_ITEMS_DATA,
	payload: { itemsData },
});
