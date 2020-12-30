// @ts-nocheck
import { productListSelectors } from '..';
import { AppStateMockBuilder } from '@store/__mocks__/AppStateMockBuilder.mock';
import { ProductListBuilderMock } from '../__mocks__/productListBuilder.mock';
import { ProductItemBuilderMock } from '../__mocks__/productItemBuilder.mock';

describe('ProductList Selector', () => {
  test('deve obter o state do productListReducer', () => {
    const mockState = new AppStateMockBuilder()
      .withProductList({ isLoading: false, productLists: [] })
      .build();

    const response = productListSelectors.getState(mockState);

    expect(response).toEqual(mockState.productListReducer);
  });

  test('deve obter os productLists do productListReducer', () => {
    const mockedList = new ProductListBuilderMock().withName('name').build();
    const mockState = new AppStateMockBuilder()
      .withProductList({ isLoading: false, productLists: [mockedList] })
      .build();

    const response = productListSelectors.getProductLists(mockState);

    expect(response).toEqual([mockedList]);
  });

  test('deve obter o isLoading do productListReducer', () => {
    const mockState = new AppStateMockBuilder()
      .withProductList({ isLoading: false, productLists: [] })
      .build();

    const response = productListSelectors.isLoading(mockState);

    expect(response).toEqual(false);
  });

  test('deve obter os itens de um productList', () => {
    const mockedListItem = new ProductItemBuilderMock()
      .withId('12345')
      .withName('mock name')
      .build();
    const mockedList = new ProductListBuilderMock()
      .withId(2)
      .withItems([mockedListItem])
      .build();

    const mockState = new AppStateMockBuilder()
      .withProductList({ productLists: [mockedList] })
      .build();

    const response = productListSelectors.getProductItems(mockState, 2);

    expect(response).toEqual([mockedListItem]);
  });
});
