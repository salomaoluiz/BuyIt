import { ProductList, ProductLists, ProductItem, ProductItems } from './types';
import { select } from 'redux-saga/effects';
import { productListSelectors } from '.';
import {
  createProductItemArray,
  createProductListArray,
  updateProductListArray,
} from './utils';
import { filterNotByID, filterByID } from '@utils/filters';

export function* createProductList(productList: ProductList) {
  try {
    const stateProductList: ProductLists = yield select(
      productListSelectors.getProductLists,
    );

    const newProductListArray = createProductListArray(
      stateProductList,
      productList,
    );

    return newProductListArray;
  } catch (err) {
    throw new Error(err);
  }
}

export function* updateProductList(productList: ProductList) {
  try {
    const stateProductList: ProductLists = yield select(
      productListSelectors.getProductLists,
    );

    const formatedProductList: ProductLists = updateProductListArray(
      stateProductList,
      productList,
    );

    return formatedProductList;
  } catch (err) {
    throw new Error(err);
  }
}

export function* deleteProductList(listId: string) {
  try {
    const productLists = yield select(productListSelectors.getProductLists);

    const filteredList: ProductLists = filterNotByID(productLists, listId);

    return filteredList;
  } catch (err) {
    throw new Error(err);
  }
}

export function* createProductItem(productItem: ProductItem, listId: string) {
  try {
    const stateProductList = yield select(productListSelectors.getProductLists);
    const currentList = filterByID(stateProductList, listId) as ProductList;

    const newEditedList = createProductItemArray(currentList, productItem);

    const newProductListsArray = updateProductListArray(
      stateProductList,
      newEditedList,
    );

    return newProductListsArray as ProductLists;
  } catch (err) {
    throw new Error(err);
  }
}

export function* getProductItems(productItems: ProductItems, listId: string) {
  try {
    const stateProductList: ProductLists = yield select(
      productListSelectors.getProductLists,
    );
    const currentList = filterByID(stateProductList, listId);

    const newEditedList: ProductList = {
      ...currentList,
      items: productItems,
    };

    const newProductListsArray = updateProductListArray(
      stateProductList,
      newEditedList,
    );

    return newProductListsArray;
  } catch (err) {
    throw new Error(err);
  }
}

export function* deleteProductItem(listId: string, itemId: string) {
  try {
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

    return newProductListsArray;
  } catch (err) {
    throw new Error(err);
  }
}

export function* updateProductItem(productItem: ProductItem, listId: string) {
  try {
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

    return newProductListsArray;
  } catch (err) {
    throw new Error(err);
  }
}
