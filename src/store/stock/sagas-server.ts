import { select, call } from 'redux-saga/effects';
import { authSelectors } from '@store/auth';

import { extractObjectElement } from '@utils/filters';
import { stockModels } from '.';
import { ProductItem } from '@store/product-list/types';
import { appStockItemsFormater } from './utils';

export function* createStockItem(stockItem: ProductItem) {
  const isAnonymously = yield select(authSelectors.isAnonymously);
  if (isAnonymously) return;

  const userId: string = yield select(authSelectors.getUserId);
  const filteredStockItem = extractObjectElement(stockItem, ['id']);

  yield call(
    stockModels.createStockItem,
    userId,
    stockItem.id,
    filteredStockItem,
  );
}

export function* getStockItems() {
  const isAnonymously = yield select(authSelectors.isAnonymously);
  if (isAnonymously) return;

  const userId = yield select(authSelectors.getUserId);

  const document = yield call(stockModels.getStock, userId);

  const formatedList = appStockItemsFormater<ProductItem>(document);

  return formatedList;
}

export function* updateStockItem(stockItem: ProductItem) {
  const isAnonymously = yield select(authSelectors.isAnonymously);
  if (isAnonymously) return;

  const userId = yield select(authSelectors.getUserId);
  const formatedStockItem = extractObjectElement(stockItem, ['id']);

  yield call(
    stockModels.updateStockItem,
    userId,
    stockItem.id,
    formatedStockItem,
  );
}

export function* deleteStockItem(itemId: string) {
  const isAnonymously = yield select(authSelectors.isAnonymously);
  if (isAnonymously) return;

  const userId = yield select(authSelectors.getUserId);
  yield call(stockModels.deleteStockItem, userId, itemId);
}
