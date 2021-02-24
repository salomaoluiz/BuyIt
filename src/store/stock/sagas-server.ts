import { select, call } from 'redux-saga/effects';

import { authSelectors } from '@store/auth';
import { ProductItem } from '@store/product-list/types';
import { extractObjectElement } from '@utils/filters';

import { stockModels } from './';
import { appStockItemsFormater } from './utils';

export function* createItem(item: ProductItem) {
  const isAnonymously = yield select(authSelectors.isAnonymously);
  if (isAnonymously) return;

  const userId: string = yield select(authSelectors.getUserId);
  const filteredItem = extractObjectElement(item, ['id']);

  yield call(stockModels.createItem, userId, item.id, filteredItem);
}

export function* requestStock() {
  const isAnonymously = yield select(authSelectors.isAnonymously);
  if (isAnonymously) return;

  const userId = yield select(authSelectors.getUserId);

  const document = yield call(stockModels.requestStock, userId);

  return appStockItemsFormater<ProductItem>(document);
}

export function* updateItem(stockItem: ProductItem) {
  const isAnonymously = yield select(authSelectors.isAnonymously);
  if (isAnonymously) return;

  const userId = yield select(authSelectors.getUserId);
  const formatedStockItem = extractObjectElement(stockItem, ['id']);

  yield call(stockModels.updateItem, userId, stockItem.id, formatedStockItem);
}

export function* deleteItem(itemId: string) {
  const isAnonymously = yield select(authSelectors.isAnonymously);
  if (isAnonymously) return;

  const userId = yield select(authSelectors.getUserId);
  yield call(stockModels.deleteItem, userId, itemId);
}
