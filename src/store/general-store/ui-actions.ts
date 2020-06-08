import { SET_LOADER } from './constants';
import { UIActions } from './types';

export const setLoader = (state: boolean): UIActions => ({
	type: SET_LOADER,
	payload: { loading: state },
});
