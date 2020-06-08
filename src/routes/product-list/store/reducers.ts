import { SET_ITEMS_DATA } from './constants';
import { ItemsReducerState, ItemsActions } from './types';

export const initialState: ItemsReducerState = {
	itemsData: [],
};

const productListReducer = (
	state: ItemsReducerState = initialState,
	action: ItemsActions,
): ItemsReducerState => {
	switch (action.type) {
	case SET_ITEMS_DATA:
		return { ...state, itemsData: action.payload.itemsData };

	default:
		return state;
	}
};

export default productListReducer;
