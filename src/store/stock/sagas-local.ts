import { select } from 'redux-saga/effects';
import { stockSelectors } from '.';

import { filterNotByID } from '@utils/filters';
import { ProductItem, ProductItems } from '@store/product-list/types';
import { createStockItemArray, updateStockItemArray } from './utils';

export function* createStockItem(stockItem: ProductItem) {
  const stateStockItems = yield select(stockSelectors.getStock);

  const newEditedList = createStockItemArray(stateStockItems, stockItem);

  return newEditedList as ProductItems;
}

export function* getStockItems() {
  const stateStockItems: ProductItems = yield select(stockSelectors.getStock);

  return stateStockItems;
}

export function* deleteStockItem(itemId: string) {
  const stateStockItems: ProductItems = yield select(stockSelectors.getStock);

  const newStockItemsArray = filterNotByID(stateStockItems, itemId);

  return newStockItemsArray;
}

export function* updateStockItem(stockItem: ProductItem) {
  const stateStockItems: ProductItems = yield select(stockSelectors.getStock);

  const newStockItemsArray = updateStockItemArray(stateStockItems, stockItem);

  return newStockItemsArray;
}
