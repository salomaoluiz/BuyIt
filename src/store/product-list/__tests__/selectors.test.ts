import { productListSelectors } from '..';
import { mockReducerInitialState } from 'src/__tests__/mocks';

describe('ProductList Selector', () => {
  test('deve obter o state do productlist', () => {
    const response = productListSelectors.getState(mockReducerInitialState);

    expect(response).toEqual(mockReducerInitialState.productListReducers);
  });
});
