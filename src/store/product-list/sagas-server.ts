import { select, call } from 'redux-saga/effects';
import { authSelectors } from '@store/auth';
import { ProductItem, ProductList, ProductLists } from './types';
import { extractObjectElement } from '@utils/filters';
import { productListModels } from '.';
import { QueryFirestore } from './models';
import { appProductListFormater, dbProductListFormated } from './utils';

export function* createProductList(productList: ProductList) {
  try {
    const userId = yield select(authSelectors.getUserId);
    const formatedProductList = dbProductListFormated(productList);

    yield call(
      productListModels.createProductList,
      userId,
      productList.id,
      formatedProductList,
    );
  } catch (err) {
    throw new Error(err);
  }
}

export function* getProductLists() {
  const userId: string = yield select(authSelectors.getUserId);

  if (userId) {
    try {
      const productList: QueryFirestore = yield call(
        productListModels.getProductLists,
        userId,
      );

      const formatedProductList = appProductListFormater<ProductLists>(
        productList,
      );

      return formatedProductList;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export function* updateProductList(productList: ProductList) {
  try {
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
  } catch (err) {
    throw new Error(err);
  }
}

export function* deleteProductList(listId: string) {
  try {
    const userId: string = yield select(authSelectors.getUserId);
    if (userId) {
      yield call(productListModels.deleteProductList, userId, listId);
    }
  } catch (err) {
    throw new Error(err);
  }
}

export function* createProductItem(productItem: ProductItem, listId: string) {
  try {
    const userId: string = yield select(authSelectors.getUserId);

    const filteredProductItem = extractObjectElement(productItem, ['id']);
    yield call(
      productListModels.createProductItem,
      userId,
      listId,
      productItem.id,
      filteredProductItem,
    );
  } catch (err) {
    throw new Error(err);
  }
}

export function* getProductItems(listId: string) {
  try {
    const userId = yield select(authSelectors.getUserId);
    const document = yield call(
      productListModels.getProductItems,
      userId,
      listId,
    );

    const formatedList = appProductListFormater<ProductItem>(document);

    return formatedList;
  } catch (err) {
    throw new Error(err);
  }
}

export function* updateProductItem(productItem: ProductItem, listId: string) {
  try {
    const userId = yield select(authSelectors.getUserId);

    const formatedProductItem = extractObjectElement(productItem, ['id']);

    yield call(
      productListModels.updateProductItem,
      userId,
      listId,
      productItem.id,
      formatedProductItem,
    );
  } catch (err) {
    throw new Error(err);
  }
}

export function* deleteProductItem(listId: string, itemId: string) {
  try {
    const userId = yield select(authSelectors.getUserId);

    yield call(productListModels.deleteProductItem, userId, listId, itemId);
  } catch (err) {
    throw new Error(err);
  }
}
