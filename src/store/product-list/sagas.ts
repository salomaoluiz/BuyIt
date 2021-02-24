import { takeLatest, put, call } from 'redux-saga/effects';

import { translate } from '@locales';
import navigationService from '@navigator/services/navigationService';
import { notificationActions } from '@store/notification';
import { addRemoveDays, formatDate } from '@utils/date';

import { productListActions } from './';
import * as sagaLocal from './sagas-local';
import * as sagaServer from './sagas-server';
import {
  ProductListTypes,
  ProductListAction,
  ProductList,
  ProductLists,
  ProductItem,
} from './types';
import { injectProductListExtraData } from './utils';

export function* createList(
  props: ProductListAction<{ productList: ProductList }>,
) {
  const { productList } = props.payload;
  try {
    yield put(productListActions.setError());

    const ajustedProductList = injectProductListExtraData(productList);

    const newProductListsArray = yield call(
      sagaLocal.createList,
      ajustedProductList,
    );

    yield put(productListActions.setProductLists(newProductListsArray));
    yield call(navigationService.goBack);

    yield call(sagaServer.createList, ajustedProductList);
  } catch (err) {
    yield put(productListActions.setError(err.message));
  }
}

export function* requestLists() {
  try {
    yield put(productListActions.setError());

    const serverProductLists = yield call(sagaServer.requestLists);

    if (serverProductLists) {
      yield put(productListActions.setProductLists(serverProductLists));
    }
  } catch (err) {
    yield put(productListActions.setError(err.message));
  }
}

export function* updateList(
  props: ProductListAction<{ productList: ProductList }>,
) {
  const { productList } = props.payload;
  try {
    yield put(productListActions.setError());

    const ajustedProductList = injectProductListExtraData(productList);

    const updatedProductLists = yield call(
      sagaLocal.updateList,
      ajustedProductList,
    );

    yield put(productListActions.setProductLists(updatedProductLists));
    yield call(navigationService.goBack);

    yield call(sagaServer.updateList, ajustedProductList);
  } catch (err) {
    yield put(productListActions.setError(err.message));
  }
}

export function* deleteList(props: ProductListAction<{ listId: string }>) {
  const { listId } = props.payload;
  try {
    yield put(productListActions.setError());

    const filteredList: ProductLists = yield call(sagaLocal.deleteList, listId);
    yield put(productListActions.setProductLists(filteredList));

    yield call(sagaServer.deleteList, listId);
  } catch (err) {
    yield put(productListActions.setError(err.message));
  }
}

export function* createItem(
  props: ProductListAction<{ productItem: ProductItem; listId: string }>,
) {
  try {
    const { productItem, listId } = props.payload;
    yield put(productListActions.setError());

    if (productItem.dueDate) {
      const notificationDate = addRemoveDays(-2, productItem.dueDate);
      yield put(
        notificationActions.scheduleLocalNotificationAsync({
          date: notificationDate,
          message: translate('productItems.productExpireInDay', {
            product: productItem.name,
            date: formatDate(productItem.dueDate),
          }),
          playSound: true,
          title: productItem.name,
        }),
      );
    }

    const formatedProductItem = injectProductListExtraData(productItem);

    const newProductList = yield call(
      sagaLocal.createItem,
      formatedProductItem,
      listId,
    );

    yield call(sagaServer.updateList, newProductList);
    yield call(navigationService.goBack);
  } catch (err) {
    yield put(productListActions.setError(err.message));
  }
}

export function* deleteItem(
  props: ProductListAction<{ listId: string; itemId: string }>,
) {
  try {
    const { listId, itemId } = props.payload;
    yield put(productListActions.setError());

    const newEditedList = yield call(sagaLocal.deleteItem, listId, itemId);

    yield call(sagaServer.updateList, newEditedList);
  } catch (err) {
    yield put(productListActions.setError(err.message));
  }
}

export function* updateItem(
  props: ProductListAction<{ productItem: ProductItem; listId: string }>,
) {
  try {
    const { productItem, listId } = props.payload;
    yield put(productListActions.setError());

    const formatedProductItem = injectProductListExtraData(productItem);

    const newEditedList = yield call(
      sagaLocal.updateItem,
      formatedProductItem,
      listId,
    );

    yield call(sagaServer.updateList, newEditedList);
    
    yield call(navigationService.goBack);
  } catch (err) {
    yield put(productListActions.setError(err.message));
  }
}

export default [
  takeLatest(ProductListTypes.CREATE_LIST, createList),
  takeLatest(ProductListTypes.REQUEST_LISTS, requestLists),
  takeLatest(ProductListTypes.UPDATE_LIST, updateList),
  takeLatest(ProductListTypes.DELETE_LIST, deleteList),
  takeLatest(ProductListTypes.CREATE_ITEM, createItem),
  takeLatest(ProductListTypes.DELETE_ITEM, deleteItem),
  takeLatest(ProductListTypes.UPDATE_ITEM, updateItem),
];
