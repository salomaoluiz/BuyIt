import { put, call } from 'redux-saga/effects';

import navigationService from '@navigator/services/navigationService';
import { ProductItemBuilderMock } from '@store/product-list/__mocks__/productItemBuilder.mock';
import { ProductItem } from '@store/product-list/types';

import { stockActions } from '../';
import * as sagas from '../sagas';
import * as sagaLocal from '../sagas-local';
import * as sagaServer from '../sagas-server';
import { StockAction } from '../types';
import { injectStockItemExtraData } from '../utils';

jest.mock('@utils/id', () => ({
  generateUniqueID: jest.fn().mockReturnValue('123456789'),
  injectId: jest
    .fn()
    .mockImplementation((object) => ({ ...object, id: '123456789' })),
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
    const action = stockActions.createItem(stock) as StockAction<{
      stockItem: ProductItem;
    }>;

    const gen = sagas.createItem(action);

    expect(gen.next().value).toEqual(put(stockActions.setError()));

    const ajustedStock = injectStockItemExtraData(stock);

    expect(gen.next(ajustedStock).value).toEqual(
      call(sagaLocal.createItem, ajustedStock),
    );

    expect(gen.next([ajustedStock]).value).toEqual(
      put(stockActions.setStock([ajustedStock])),
    );
    expect(gen.next().value).toEqual(call(navigationService.goBack));

    expect(gen.next(ajustedStock).value).toEqual(
      call(sagaServer.createItem, ajustedStock),
    );

    expect(gen.next().done).toBe(true);
  });

  test('ao chamar createStockAsync com erro deve setar o erro corretamente', () => {
    const action = stockActions.createItem(stock) as StockAction<{
      stockItem: ProductItem;
    }>;

    const gen = sagas.createItem(action);

    expect(gen.next().value).toEqual(put(stockActions.setError()));

    const ajustedStock = injectStockItemExtraData(stock);

    expect(gen.next(ajustedStock).value).toEqual(
      call(sagaLocal.createItem, ajustedStock),
    );

    const error = new Error('error');
    expect(gen.throw(error).value).toEqual(
      put(stockActions.setError(error.message)),
    );

    expect(gen.next().done).toBe(true);
  });

  test('deve chamar getStocksAsync corretamente', () => {
    const gen = sagas.requestStock();

    expect(gen.next().value).toEqual(put(stockActions.setError()));

    expect(gen.next().value).toEqual(call(sagaServer.requestStock));
    expect(gen.next().value).toEqual(call(sagaLocal.requestStock));

    expect(gen.next([stock]).value).toEqual(
      put(stockActions.setStock([stock])),
    );

    expect(gen.next().done).toBe(true);
  });

  test('ao chamar getStocksAsync com erro deve setar o erro corretamente', () => {
    const gen = sagas.requestStock();

    expect(gen.next().value).toEqual(put(stockActions.setError()));

    expect(gen.next().value).toEqual(call(sagaServer.requestStock));

    const error = new Error('error');
    expect(gen.throw(error).value).toEqual(
      put(stockActions.setError(error.message)),
    );

    expect(gen.next().done).toBe(true);
  });

  test('deve chamar updateStockAsync corretamente', () => {
    const action = stockActions.updateItem(stock) as StockAction<{
      stockItem: ProductItem;
    }>;

    const gen = sagas.updateItem(action);

    expect(gen.next().value).toEqual(put(stockActions.setError()));

    const ajustedStock = injectStockItemExtraData(stock);

    expect(gen.next(ajustedStock).value).toEqual(
      call(sagaLocal.updateItem, ajustedStock),
    );
    expect(gen.next([ajustedStock]).value).toEqual(
      put(stockActions.setStock([ajustedStock])),
    );
    expect(gen.next().value).toEqual(call(navigationService.goBack));

    expect(gen.next(ajustedStock).value).toEqual(
      call(sagaServer.updateItem, ajustedStock),
    );

    expect(gen.next().done).toBe(true);
  });

  test('ao chamar updateStockAsync com erro deve setar o erro corretamente', () => {
    const action = stockActions.updateItem(stock) as StockAction<{
      stockItem: ProductItem;
    }>;

    const gen = sagas.updateItem(action);

    expect(gen.next().value).toEqual(put(stockActions.setError()));

    const ajustedStock = injectStockItemExtraData(stock);

    expect(gen.next(ajustedStock).value).toEqual(
      call(sagaLocal.updateItem, ajustedStock),
    );

    const error = new Error('error');
    expect(gen.throw(error).value).toEqual(
      put(stockActions.setError(error.message)),
    );

    expect(gen.next().done).toBe(true);
  });

  test('deve chamar deleteStockAsync corretamente', () => {
    const itemId = '123456';
    const mockStocks = new ProductItemBuilderMock().withName('Lista').build();

    const action = stockActions.deleteItem(itemId) as StockAction<{
      itemId: string;
    }>;

    const gen = sagas.deleteItem(action);

    expect(gen.next().value).toEqual(put(stockActions.setError()));

    expect(gen.next([mockStocks]).value).toEqual(
      call(sagaLocal.deleteItem, itemId),
    );

    expect(gen.next([mockStocks]).value).toEqual(
      put(stockActions.setStock([mockStocks])),
    );

    expect(gen.next().value).toEqual(call(sagaServer.deleteItem, itemId));

    expect(gen.next().done).toBe(true);
  });

  test('ao chamar deleteStockAsync com erro deve setar o erro corretamente', () => {
    const itemId = '123456';
    const action = stockActions.deleteItem(itemId) as StockAction<{
      itemId: string;
    }>;

    const gen = sagas.deleteItem(action);

    expect(gen.next().value).toEqual(put(stockActions.setError()));

    expect(gen.next().value).toEqual(call(sagaLocal.deleteItem, itemId));

    const error = new Error('error');
    expect(gen.throw(error).value).toEqual(
      put(stockActions.setError(error.message)),
    );

    expect(gen.next().done).toBe(true);
  });
});
