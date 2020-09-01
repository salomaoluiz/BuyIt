import generalReducers from '../reducer';
import { initialState } from '../reducer';
import generalActions from '../actions';

describe('General Reducers', () => {
  it('should set correctly the loading state', () => {
    const action = generalActions.setLoading(true);
    const response = generalReducers(initialState, action);

    expect(response.isLoading).toEqual(true);
  });

  test('deve retornar o valor default', () => {
    const action = { type: 'any', payload: {} };

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const result = generalReducers(initialState, action);

    expect(result).toEqual(initialState);
  });
});
