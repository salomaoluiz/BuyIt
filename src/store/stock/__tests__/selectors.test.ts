import { AppStateMockBuilder } from '@store/__mocks__/AppStateMockBuilder.mock';
import { ProductItemBuilderMock } from '@store/product-list/__mocks__/productItemBuilder.mock';

import * as selectors from '../selectors';

describe('Stock Selector', () => {
  const mockedList = new ProductItemBuilderMock().withName('name').build();
  const error = 'Error';

  const mockState = new AppStateMockBuilder()
    .withStock({ isLoading: false, stock: [mockedList], error })
    .build();

  const getState = [
    'getState',
    selectors.getState(mockState),
    { isLoading: false, stock: [mockedList], error },
  ];

  const isLoading = ['isLoading', selectors.isLoading(mockState), false];

  const getStock = ['getStock', selectors.getStock(mockState), [mockedList]];

  const getError = ['getError', selectors.getError(mockState), error];

  test.each([getState, isLoading, getStock, getError] as Array<
    [string, typeof selectors, any]
  >)(
    'deve retornar o state correto para o selector %s',
    (describe, selector, expected) => {
      expect(selector).toEqual(expected);
    },
  );
});
