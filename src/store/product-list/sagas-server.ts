import { select, call } from 'redux-saga/effects';

import { authSelectors } from '@store/auth';
import { extractObjectElement } from '@utils/filters';

import { productListModels } from './';
import { QueryFirestore } from './models';
import { ProductList, ProductLists } from './types';
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
