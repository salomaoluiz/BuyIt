import { select, call } from 'redux-saga/effects';
import { authSelectors } from '@store/auth';
import { ProductItem, ProductList, ProductLists } from './types';
import { extractObjectElement } from '@utils/filters';
import { productListModels, productListSelectors } from '.';
import { QueryFirestore } from './models';
import { appProductListFormater, dbProductListFormated } from './utils';

export function* createProductList(productList: ProductList) {
  const isAnonymously = yield select(authSelectors.isAnonymously);
  if (isAnonymously) return;

  const userId = yield select(authSelectors.getUserId);
  const formatedProductList = dbProductListFormated(productList);

  yield call(
    productListModels.createProductList,
    userId,
    productList.id,
    formatedProductList,
  );
}

export function* getProductLists() {
  const isAnonymously = yield select(authSelectors.isAnonymously);
  const productLists = yield select(productListSelectors.getProductLists);
  if (isAnonymously) return productLists;

  const userId: string = yield select(authSelectors.getUserId);
  if (userId) {
    const productList: QueryFirestore = yield call(
      productListModels.getProductLists,
      userId,
    );

    const formatedProductList = appProductListFormater<ProductLists>(
      productList,
    );

    return formatedProductList;
  }
}

export function* updateProductList(productList: ProductList) {
  const isAnonymously = yield select(authSelectors.isAnonymously);
  if (isAnonymously) return;

  const userId: string = yield select(authSelectors.getUserId);
  if (userId) {
    const formatedProductList = extractObjectElement(productList, [
      'id',
      'items',
    ]);

    yield call(
      productListModels.updateProductList,
      userId,
      productList.id,
      formatedProductList,
    );
  }
}

export function* deleteProductList(listId: string) {
  const isAnonymously = yield select(authSelectors.isAnonymously);
  if (isAnonymously) return;

  const userId: string = yield select(authSelectors.getUserId);
  if (userId) {
    yield call(productListModels.deleteProductList, userId, listId);
  }
}

export function* createProductItem(productItem: ProductItem, listId: string) {
  const isAnonymously = yield select(authSelectors.isAnonymously);
  if (isAnonymously) return;

  const userId: string = yield select(authSelectors.getUserId);
  const filteredProductItem = extractObjectElement(productItem, ['id']);
  yield call(
    productListModels.createProductItem,
    userId,
    listId,
    productItem.id,
    filteredProductItem,
  );
}

export function* getProductItems(listId: string) {
  const isAnonymously = yield select(authSelectors.isAnonymously);
  if (isAnonymously) return [];

  const userId = yield select(authSelectors.getUserId);

  const document = yield call(
    productListModels.getProductItems,
    userId,
    listId,
  );

  const formatedList = appProductListFormater<ProductItem>(document);

  return formatedList;
}

export function* updateProductItem(productItem: ProductItem, listId: string) {
  const isAnonymously = yield select(authSelectors.isAnonymously);
  if (isAnonymously) return;

  const userId = yield select(authSelectors.getUserId);
  const formatedProductItem = extractObjectElement(productItem, ['id']);

  yield call(
    productListModels.updateProductItem,
    userId,
    listId,
    productItem.id,
    formatedProductItem,
  );
}

export function* deleteProductItem(listId: string, itemId: string) {
  const isAnonymously = yield select(authSelectors.isAnonymously);
  if (isAnonymously) return;

  const userId = yield select(authSelectors.getUserId);
  yield call(productListModels.deleteProductItem, userId, listId, itemId);
}
