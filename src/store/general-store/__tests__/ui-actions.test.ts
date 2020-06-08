import { setLoader } from '../ui-actions';

describe('Testing UI Actions', () => {
	it('should return the action correctly to state true', () => {
		const response = setLoader(true);

		expect(response.payload.loading).toEqual(true);
	});
});
