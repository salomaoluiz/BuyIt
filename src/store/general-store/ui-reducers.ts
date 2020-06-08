import { SET_LOADER } from './constants';
import { UIReducerState, UIActions } from './types';

export const initialState = {
	loading: false,
};

const uiReducer = (
	state: UIReducerState = initialState,
	action: UIActions,
): UIReducerState => {
	switch (action.type) {
	case SET_LOADER:
		return { ...state, loading: action.payload.loading };

	default:
		return state;
	}
};

export default uiReducer;
