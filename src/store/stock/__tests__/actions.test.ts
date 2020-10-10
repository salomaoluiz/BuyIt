import { stockActions } from '..';
import { StockTypes } from '../types';
import { StockBuilderMock } from '../__mocks__/stockItemBuilder.mock';

describe('Stock Actions', () => {
  test('deve retornar setLoading corretamente.', () => {
    const result = stockActions.setLoading(true);

    expect(result).toEqual({
      type: StockTypes.SET_LOADING,
      payload: {
        isLoading: true,
      },
    });
  });

  test('deve retornar setError corretamente.', () => {
    const mockError = new Error('teste');
    const result = stockActions.setError(mockError.message);

    expect(result).toEqual({
      type: StockTypes.SET_ERROR,
      payload: {
        error: 'teste',
      },
    });
  });

  test('deve retornar getStockAsync corretamente.', () => {
    const result = stockActions.getStockAsync();

    expect(result).toEqual({
      type: StockTypes.GET_STOCK_ASYNC,
    });
  });

  test('deve retornar createProductItemAsync corretamente.', () => {
    const mockData = new StockBuilderMock().withName('Lista').build();

    const result = stockActions.createProductItemAsync(mockData);

    expect(result).toEqual({
      type: StockTypes.CREATE_ITEM_ASYNC,
      payload: {
        stockItem: mockData,
      },
    });
  });

  test('deve retornar updateProductItemAsync corretamente.', () => {
    const mockData = new StockBuilderMock().withName('Lista').build();

    const result = stockActions.updateProductItemAsync(mockData);

    expect(result).toEqual({
      type: StockTypes.UPDATE_ITEM_ASYNC,
      payload: {
        stockItem: mockData,
      },
    });
  });

  test('deve retornar deleteProductItemAsync corretamente.', () => {
    const result = stockActions.deleteProductItemAsync('12345');

    expect(result).toEqual({
      type: StockTypes.DELETE_ITEM_ASYNC,
      payload: {
        itemId: '12345',
      },
    });
  });

  test('deve retornar setStock corretamente.', () => {
    const mockData = [
      new StockBuilderMock()
        .withId('12345')
        .withAmount('11')
        .withBrand('BR')
        .withName('Name')
        .withQtd('1')
        .withUnit({ id: 'UN', title: 'Unidade' })
        .build(),
    ];

    const result = stockActions.setStock(mockData);

    expect(result).toEqual({
      type: StockTypes.SET_STOCK,
      payload: {
        stock: mockData,
      },
    });
  });
});
