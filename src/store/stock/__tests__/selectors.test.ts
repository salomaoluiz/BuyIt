import { stockSelectors } from '..';
import { AppStateMockBuilder } from '@store/__mocks__/AppStateMockBuilder.mock';
import { ProductItemBuilderMock } from '@store/product-list/__mocks__/productItemBuilder.mock';

describe('Stock Selector', () => {
  test('deve obter o state do stockReducer', () => {
    const mockState = new AppStateMockBuilder()
      .withStock({ isLoading: false, stock: [] })
      .build();

    const response = stockSelectors.getState(mockState);

    expect(response).toEqual(mockState.stockReducer);
  });

  test('deve obter os stocks do stockReducer', () => {
    const mockedList = new ProductItemBuilderMock().withName('name').build();
    const mockState = new AppStateMockBuilder()
      .withStock({ isLoading: false, stock: [mockedList] })
      .build();

    const response = stockSelectors.getStock(mockState);

    expect(response).toEqual([mockedList]);
  });

  test('deve obter o isLoading do stockReducer', () => {
    const mockState = new AppStateMockBuilder()
      .withStock({ isLoading: false, stock: [] })
      .build();

    const response = stockSelectors.isLoading(mockState);

    expect(response).toEqual(false);
  });

  test('deve obter o error do stockReducer', () => {
    const error = 'Error';
    const mockState = new AppStateMockBuilder()
      .withStock({ isLoading: false, stock: [], error })
      .build();

    const response = stockSelectors.getError(mockState);

    expect(response).toEqual('Error');
  });
});
