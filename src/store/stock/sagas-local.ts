import { select } from 'redux-saga/effects';

import { ProductItem, ProductItems } from '@store/product-list/types';
import { filterNotByID } from '@utils/filters';

import { stockSelectors } from './';
import { createStockItemArray, updateStockItemArray } from './utils';

export function* createItem(stockItem: ProductItem) {
  const stateStockItems = yield select(stockSelectors.getStock);

  const newEditedList = createStockItemArray(stateStockItems, stockItem);

  return newEditedList as ProductItems;
}

export function* requestStock() {
  const stateStockItems: ProductItems = yield select(stockSelectors.getStock);

  return stateStockItems;
}

export function* deleteItem(itemId: string) {
  const stateStockItems: ProductItems = yield select(stockSelectors.getStock);

  const newStockItemsArray = filterNotByID(stateStockItems, itemId);

  return newStockItemsArray;
}

export function* updateItem(stockItem: ProductItem) {
  const stateStockItems: ProductItems = yield select(stockSelectors.getStock);

  const newStockItemsArray = updateStockItemArray(stateStockItems, stockItem);

  return newStockItemsArray;
}
