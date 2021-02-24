import { AppStateMockBuilder } from '@store/__mocks__/AppStateMockBuilder.mock';

import { ProductItemBuilderMock } from '../__mocks__/productItemBuilder.mock';
import { ProductListBuilderMock } from '../__mocks__/productListBuilder.mock';
import * as selectors from '../selectors';

describe('ProductList Selector', () => {
  const mockItem = new ProductItemBuilderMock()
    .withId('12345')
    .withName('mock name')
    .build();

  const mockList = new ProductListBuilderMock()
    .withId('2')
    .withItems([mockItem])
    .build();

  const mockState = new AppStateMockBuilder()
    .withProductList({ isLoading: false, productLists: [mockList] })
    .build();

  //#region Selectors

  const getState = [
    'getState',
    selectors.getState(mockState),
    { isLoading: false, productLists: [mockList] },
  ];

  const getProductLists = [
    'getProductLists',
    selectors.getProductLists(mockState),
    [mockList],
  ];

  const isLoading = ['isLoading', selectors.isLoading(mockState), false];

  const getProductItems = [
    'getProductItems',
    selectors.getProductItems(mockState, '2'),
    [mockItem],
  ];

  const getAllItems = [
    'getAllItems',
    selectors.getAllItems(mockState),
    [mockItem],
  ];
  //#endregion

  test.each([
    getState,
    getProductLists,
    isLoading,
    getProductItems,
    getAllItems,
  ] as Array<[string, typeof selectors, any]>)(
    'deve retornar corretamente os dados do selector %s',
    (describe, selector, expected) => {
      expect(selector).toEqual(expected);
    },
  );
});
