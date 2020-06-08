import uiReducer from '../ui-reducers';
import { initialState } from '../ui-reducers';
import { setLoader } from '../ui-actions';

describe('Testing UI Reducers', () => {
	it('should set correctly the loading state', () => {
		const action = setLoader(true);
		const response = uiReducer(initialState, action);

		expect(response.loading).toEqual(true);
	});
});
