import { select, call } from 'redux-saga/effects';

import { authSelectors } from '@store/auth';
import { extractObjectElement } from '@utils/filters';

import { productListModels } from './';
import { QueryFirestore } from './models';
import { ProductItem, ProductList, ProductLists } from './types';
import { appProductListFormater, dbProductListFormated } from './utils';

export function* createList(productList: ProductList) {
  const isAnonymously = yield select(authSelectors.isAnonymously);
  if (isAnonymously) return;

  const userId = yield select(authSelectors.getUserId);
  const formatedProductList = dbProductListFormated(productList);

  yield call(
    productListModels.createList,
    userId,
    productList.id,
    formatedProductList,
  );
}

export function* requestLists() {
  const isAnonymously = yield select(authSelectors.isAnonymously);
  if (isAnonymously) return;

  const userId: string = yield select(authSelectors.getUserId);
  if (userId) {
    const productList: QueryFirestore<ProductLists> = yield call(
      productListModels.requestLists,
      userId,
    );

    return appProductListFormater<ProductLists>(productList);
  }
}

export function* updateList(productList: ProductList) {
  const isAnonymously = yield select(authSelectors.isAnonymously);
  if (isAnonymously) return;

  const userId: string = yield select(authSelectors.getUserId);
  if (userId) {
    const formatedProductList = extractObjectElement(productList, [
      'id',
      'items',
    ]);

    yield call(
      productListModels.updateList,
      userId,
      productList.id,
      formatedProductList,
    );
  }
}

export function* deleteList(listId: string) {
  const isAnonymously = yield select(authSelectors.isAnonymously);
  if (isAnonymously) return;

  const userId: string = yield select(authSelectors.getUserId);
  if (userId) {
    yield call(productListModels.deleteList, userId, listId);
  }
}

export function* createItem(productItem: ProductItem, listId: string) {
  const isAnonymously = yield select(authSelectors.isAnonymously);
  if (isAnonymously) return;

  const userId: string = yield select(authSelectors.getUserId);
  const filteredProductItem = extractObjectElement(productItem, ['id']);
  yield call(
    productListModels.createItem,
    userId,
    listId,
    productItem.id,
    filteredProductItem,
  );
}

export function* requestItems(listId: string) {
  const isAnonymously = yield select(authSelectors.isAnonymously);
  if (isAnonymously) return;

  const userId = yield select(authSelectors.getUserId);

  const document = yield call(productListModels.requestItems, userId, listId);

  return appProductListFormater<ProductItem>(document);
}

export function* updateItem(productItem: ProductItem, listId: string) {
  const isAnonymously = yield select(authSelectors.isAnonymously);
  if (isAnonymously) return;

  const userId = yield select(authSelectors.getUserId);
  const formatedProductItem = extractObjectElement(productItem, ['id']);

  yield call(
    productListModels.updateItem,
    userId,
    listId,
    productItem.id,
    formatedProductItem,
  );
}

export function* deleteItem(listId: string, itemId: string) {
  const isAnonymously = yield select(authSelectors.isAnonymously);
  if (isAnonymously) return;

  const userId = yield select(authSelectors.getUserId);
  yield call(productListModels.deleteItem, userId, listId, itemId);
}
