import { select } from 'redux-saga/effects';

import { ProductItem, ProductItems } from '@store/product-list/types';
import { filterNotByID } from '@utils/filters';

import { stockSelectors } from './';
import { createStockItemArray, updateStockItemArray } from './utils';

export function* createItem(stockItem: ProductItem) {
  const stateStockItems = yield select(stockSelectors.getStock);

  return createStockItemArray(stateStockItems, stockItem);
}

export function* requestStock() {
  return yield select(stockSelectors.getStock);
}

export function* deleteItem(itemId: string) {
  const stateStockItems: ProductItems = yield select(stockSelectors.getStock);

  return filterNotByID(stateStockItems, itemId);
}

export function* updateItem(stockItem: ProductItem) {
  const stateStockItems: ProductItems = yield select(stockSelectors.getStock);

  return updateStockItemArray(stateStockItems, stockItem);
}
