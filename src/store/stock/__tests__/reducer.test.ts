import { ProductItemBuilderMock } from '@store/product-list/__mocks__/productItemBuilder.mock';

import { stockActions } from '../';
import stockReducer from '../reducer';
import { StockAction, StockState, StockTypes } from '../types';

describe('ProductList Reducers', () => {
  const initialState = {
    isLoading: false,
    stock: [],
    error: undefined,
  };

  const mockData = new ProductItemBuilderMock()
    .withId('123456')
    .withName('Teste')
    .build();

  const mockError = new Error('error');

  const any = ['any', { type: 'any' as StockTypes }, { ...initialState }];
  const setError = [
    'setError',
    stockActions.setError(mockError.message),
    { ...initialState, error: mockError.message },
  ];

  const setStock = [
    'setStock',
    stockActions.setStock([mockData]),
    { ...initialState, stock: [mockData] },
  ];

  test.each([any, setError, setStock] as Array<
    [string, StockAction<StockState>, StockState]
  >)(
    'deve retornar o state correto para a actions %s',
    (describe, action, expected) => {
      const response = stockReducer(initialState, action);

      expect(response).toEqual(expected);
    },
  );
});
