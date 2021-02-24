import { ProductListBuilderMock } from '../__mocks__/productListBuilder.mock';
import actions from '../actions';
import reducer from '../reducer';
import {
  ProductListAction,
  ProductListState,
  ProductListTypes,
} from '../types';

describe('ProductList Reducers', () => {
  const initialState = {
    isLoading: false,
    productLists: [],
    error: undefined,
  };

  const mockData = new ProductListBuilderMock()
    .withId('123456')
    .withName('Teste')
    .build();

  //#region Actions

  const any = ['any', { type: 'any' as ProductListTypes }, { ...initialState }];

  const setError = [
    'setError',
    actions.setError('error'),
    { ...initialState, error: 'error' },
  ];

  const setProductLists = [
    'setProductLists',
    actions.setProductLists([mockData]),
    { ...initialState, productLists: [mockData] },
  ];

  const requestLists = [
    'requestLists',
    actions.requestLists(),
    { ...initialState, isLoading: true, error: undefined },
  ];

  //#endregion

  test.each([
    any,
    setError,
    setProductLists,
    requestLists,
  ] as Array<[string, ProductListAction<ProductListState>, ProductListState]>)(
    'deve retornar corretamente o state para a action %s',
    (describe, action, expected) => {
      const response = reducer(initialState, action);

      expect(response).toEqual(expected);
    },
  );
});
