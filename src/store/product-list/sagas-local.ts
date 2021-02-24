import { put, select } from 'redux-saga/effects';

import { filterNotByID, filterByID } from '@utils/filters';

import { productListActions, productListSelectors } from './';
import { ProductList, ProductLists, ProductItem, ProductItems } from './types';
import {
  createProductItemArray,
  createProductListArray,
  updateProductListArray,
} from './utils';

export function* createList(productList: ProductList) {
  const stateProductList: ProductLists = yield select(
    productListSelectors.getProductLists,
  );

  return createProductListArray(stateProductList, productList);
}

export function* updateList(productList: ProductList) {
  const stateProductList: ProductLists = yield select(
    productListSelectors.getProductLists,
  );

  return updateProductListArray(stateProductList, productList);
}

export function* deleteList(listId: string) {
  const productLists = yield select(productListSelectors.getProductLists);

  return filterNotByID(productLists, listId);
}

export function* createItem(productItem: ProductItem, listId: string) {
  const stateProductList = yield select(productListSelectors.getProductLists);

  const currentList = filterByID<ProductList>(stateProductList, listId);

  const newEditedList = createProductItemArray(currentList, productItem);

  const newProductListsArray = updateProductListArray(
    stateProductList,
    newEditedList,
  );
  yield put(productListActions.setProductLists(newProductListsArray));

  return newEditedList as ProductList;
}

export function* requestItems(productItems: ProductItems, listId: string) {
  const stateProductList: ProductLists = yield select(
    productListSelectors.getProductLists,
  );
  const currentList = filterByID(stateProductList, listId);

  const newEditedList: ProductList = {
    ...currentList,
    items: productItems,
  };

  return updateProductListArray(stateProductList, newEditedList);
}

export function* deleteItem(listId: string, itemId: string) {
  const stateProductList: ProductLists = yield select(
    productListSelectors.getProductLists,
  );
  const currentList = filterByID(stateProductList, listId);

  const productItems = currentList.items;
  const filteredItems = filterNotByID(productItems, itemId);

  const newEditedList: ProductList = {
    ...currentList,
    items: filteredItems,
  };

  const newProductListsArray = updateProductListArray(
    stateProductList,
    newEditedList,
  );

  yield put(productListActions.setProductLists(newProductListsArray));

  return newEditedList;
}

export function* updateItem(productItem: ProductItem, listId: string) {
  const stateProductList: ProductLists = yield select(
    productListSelectors.getProductLists,
  );
  const currentList = filterByID(stateProductList, listId);

  const filteredListItem = filterNotByID(currentList.items, productItem.id);
  const newProductItemsArray = filteredListItem.concat([{ ...productItem }]);
  const newEditedList: ProductList = {
    ...currentList,
    items: newProductItemsArray,
  };

  const newProductListsArray = updateProductListArray(
    stateProductList,
    newEditedList,
  );

  yield put(productListActions.setProductLists(newProductListsArray));

  return newEditedList;
}
