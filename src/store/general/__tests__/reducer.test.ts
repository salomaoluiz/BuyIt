import generalActions from '../actions';
import generalReducers from '../reducer';
import { initialState } from '../reducer';

describe('General Reducers', () => {
  test('deve retornar o valor correto para o setLoading', () => {
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
