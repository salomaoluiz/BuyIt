// @ts-nocheck

import listItemsReducer from '../reducer';
import { productListActions } from '..';
import { ProductListBuilderMock } from '../__mocks__/productListBuilder.mock';

describe('ProductList Reducers', () => {
  const initialState = {
    isLoading: false,
    productLists: [],
    error: undefined,
  };

  test('deve retornar o state para uma action default', () => {
    const action = { type: 'any' };

    const response = listItemsReducer(initialState, action);

    const expected = {
      ...initialState,
    };

    expect(response).toEqual(expected);
  });

  test('deve retornar o state correto para o setLoading', () => {
    const action = productListActions.setLoading(true);

    const response = listItemsReducer(initialState, action);

    const expected = {
      ...initialState,
      isLoading: true,
    };

    expect(response).toEqual(expected);
  });

  test('deve retornar o state correto para o setError', () => {
    const mockError = new Error('error');
    const action = productListActions.setError(mockError);

    const response = listItemsReducer(initialState, action);

    const expected = {
      ...initialState,
      error: mockError,
    };

    expect(response).toEqual(expected);
  });

  test('deve retornar o state correto para o setProductList', () => {
    const mockData = new ProductListBuilderMock()
      .withId('123456')
      .withName('Teste')
      .build();

    const mockProductLists = [mockData];

    const action = productListActions.setProductLists(mockProductLists);

    const response = listItemsReducer(initialState, action);

    const expected = {
      ...initialState,
      productLists: mockProductLists,
    };

    expect(response).toEqual(expected);
  });
});
