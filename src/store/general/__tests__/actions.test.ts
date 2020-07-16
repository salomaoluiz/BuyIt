import generalActions from '../actions';

describe('General Actions', () => {
  it('should return the action correctly to state true', () => {
    const response = generalActions.setLoading(true);

    expect(response.payload.isLoading).toEqual(true);
  });
});
