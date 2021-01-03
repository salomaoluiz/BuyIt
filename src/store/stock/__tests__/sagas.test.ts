import { put, call } from 'redux-saga/effects';

import navigationService from '@navigator/services/navigationService';
import { ProductItemBuilderMock } from '@store/product-list/__mocks__/productItemBuilder.mock';
import { ProductItem } from '@store/product-list/types';

import { stockActions } from '../';
import * as sagas from '../sagas';
import * as sagaLocal from '../sagas-local';
import * as sagaServer from '../sagas-server';
import { StockActions } from '../types';
import { injectStockItemExtraData } from '../utils';

jest.mock('@utils/id', () => ({
  generateUniqueID: jest.fn().mockReturnValue('123456789'),
  injectId: jest.fn().mockImplementation((object) => ({ ...object, id: '123456789' })),
}));

jest.mock('@utils/date', () => ({
  getDateNow: jest.fn().mockReturnValue(12345),
  injectTimeStamp: jest.fn().mockImplementation((object) => ({
    ...object,
    updatedAt: 12345,
    createdAt: 1234,
  })),
}));

const stock = new ProductItemBuilderMock().withName('Nome').build();

describe('Stock Sagas', () => {
  test('deve chamar createStockAsync corretamente', () => {
    const action = stockActions.createProductItemAsync(stock) as StockActions<{
      stockItem: ProductItem;
    }>;

    const gen = sagas.createStockAsync(action);

    expect(gen.next().value).toEqual(put(stockActions.setError()));
    expect(gen.next().value).toEqual(put(stockActions.setLoading(true)));

    const ajustedStock = injectStockItemExtraData(stock);

    expect(gen.next(ajustedStock).value).toEqual(
      call(sagaLocal.createStockItem, ajustedStock),
    );

    expect(gen.next([ajustedStock]).value).toEqual(
      put(stockActions.setStock([ajustedStock])),
    );
    expect(gen.next().value).toEqual(call(navigationService.goBack));

    expect(gen.next(ajustedStock).value).toEqual(
      call(sagaServer.createStockItem, ajustedStock),
    );

    expect(gen.next().value).toEqual(put(stockActions.setLoading(false)));
    expect(gen.next().done).toBe(true);
  });

  test('ao chamar createStockAsync com erro deve setar o erro corretamente', () => {
    const action = stockActions.createProductItemAsync(stock) as StockActions<{
      stockItem: ProductItem;
    }>;

    const gen = sagas.createStockAsync(action);

    expect(gen.next().value).toEqual(put(stockActions.setError()));
    expect(gen.next().value).toEqual(put(stockActions.setLoading(true)));

    const ajustedStock = injectStockItemExtraData(stock);

    expect(gen.next(ajustedStock).value).toEqual(
      call(sagaLocal.createStockItem, ajustedStock),
    );

    const error = new Error('error');
    expect(gen.throw(error).value).toEqual(
      put(stockActions.setError(error.message)),
    );

    expect(gen.next().value).toEqual(put(stockActions.setLoading(false)));
    expect(gen.next().done).toBe(true);
  });

  test('deve chamar getStocksAsync corretamente', () => {
    const gen = sagas.getStocksAsync();
 
    expect(gen.next().value).toEqual(put(stockActions.setError()));

    expect(gen.next().value).toEqual(put(stockActions.setLoading(true)));

    expect(gen.next().value).toEqual(call(sagaServer.getStockItems));
    expect(gen.next().value).toEqual(call(sagaLocal.getStockItems));

    expect(gen.next([stock]).value).toEqual(
      put(stockActions.setStock([stock])),
    );

    expect(gen.next().value).toEqual(put(stockActions.setLoading(false)));
    expect(gen.next().done).toBe(true);
  });

  test('ao chamar getStocksAsync com erro deve setar o erro corretamente', () => {
    const gen = sagas.getStocksAsync();

    expect(gen.next().value).toEqual(put(stockActions.setError()));

    expect(gen.next().value).toEqual(put(stockActions.setLoading(true)));

    expect(gen.next().value).toEqual(call(sagaServer.getStockItems));

    const error = new Error('error');
    expect(gen.throw(error).value).toEqual(
      put(stockActions.setError(error.message)),
    );

    expect(gen.next().value).toEqual(put(stockActions.setLoading(false)));
    expect(gen.next().done).toBe(true);
  });

  test('deve chamar updateStockAsync corretamente', () => {
    const action = stockActions.updateProductItemAsync(stock) as StockActions<{
      stockItem: ProductItem;
    }>;

    const gen = sagas.updateStockAsync(action);

    expect(gen.next().value).toEqual(put(stockActions.setError()));
    expect(gen.next().value).toEqual(put(stockActions.setLoading(true)));

    const ajustedStock = injectStockItemExtraData(stock);

    expect(gen.next(ajustedStock).value).toEqual(
      call(sagaLocal.updateStockItem, ajustedStock),
    );
    expect(gen.next([ajustedStock]).value).toEqual(
      put(stockActions.setStock([ajustedStock])),
    );
    expect(gen.next().value).toEqual(call(navigationService.goBack));

    expect(gen.next(ajustedStock).value).toEqual(
      call(sagaServer.updateStockItem, ajustedStock),
    );

    expect(gen.next().value).toEqual(put(stockActions.setLoading(false)));
    expect(gen.next().done).toBe(true);
  });

  test('ao chamar updateStockAsync com erro deve setar o erro corretamente', () => {
    const action = stockActions.updateProductItemAsync(stock) as StockActions<{
      stockItem: ProductItem;
    }>;

    const gen = sagas.updateStockAsync(action);

    expect(gen.next().value).toEqual(put(stockActions.setError()));

    expect(gen.next().value).toEqual(put(stockActions.setLoading(true)));

    const ajustedStock = injectStockItemExtraData(stock);

    expect(gen.next(ajustedStock).value).toEqual(
      call(sagaLocal.updateStockItem, ajustedStock),
    );

    const error = new Error('error');
    expect(gen.throw(error).value).toEqual(
      put(stockActions.setError(error.message)),
    );

    expect(gen.next().value).toEqual(put(stockActions.setLoading(false)));
    expect(gen.next().done).toBe(true);
  });

  test('deve chamar deleteStockAsync corretamente', () => {
    const itemId = '123456';
    const mockStocks = new ProductItemBuilderMock().withName('Lista').build();

    const action = stockActions.deleteProductItemAsync(itemId) as StockActions<{
      itemId: string;
    }>;

    const gen = sagas.deleteStockAsync(action);

    expect(gen.next().value).toEqual(put(stockActions.setError()));
    expect(gen.next().value).toEqual(put(stockActions.setLoading(true)));

    expect(gen.next([mockStocks]).value).toEqual(
      call(sagaLocal.deleteStockItem, itemId),
    );

    expect(gen.next([mockStocks]).value).toEqual(
      put(stockActions.setStock([mockStocks])),
    );

    expect(gen.next().value).toEqual(call(sagaServer.deleteStockItem, itemId));

    expect(gen.next().value).toEqual(put(stockActions.setLoading(false)));
    expect(gen.next().done).toBe(true);
  });

  test('ao chamar deleteStockAsync com erro deve setar o erro corretamente', () => {
    const itemId = '123456';
    const action = stockActions.deleteProductItemAsync(itemId) as StockActions<{
      itemId: string;
    }>;

    const gen = sagas.deleteStockAsync(action);

    expect(gen.next().value).toEqual(put(stockActions.setError()));

    expect(gen.next().value).toEqual(put(stockActions.setLoading(true)));

    expect(gen.next().value).toEqual(call(sagaLocal.deleteStockItem, itemId));

    const error = new Error('error');
    expect(gen.throw(error).value).toEqual(
      put(stockActions.setError(error.message)),
    );

    expect(gen.next().value).toEqual(put(stockActions.setLoading(false)));
    expect(gen.next().done).toBe(true);
  });
});
