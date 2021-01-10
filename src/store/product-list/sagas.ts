import { takeLatest, put, call, select } from 'redux-saga/effects';

import appLocale from '@locales';
import navigationService from '@navigator/services/navigationService';
import { notificationActions } from '@store/notification';
import { addRemoveDays, formatDate } from '@utils/date';

import { productListActions } from './';
import * as sagaLocal from './sagas-local';
import * as sagaServer from './sagas-server';
import * as selectors from './selectors';
import {
  ProductListTypes,
  ProductListAction,
  ProductList,
  ProductLists,
  ProductItem,
} from './types';
import { injectProductListExtraData } from './utils';

const strings = appLocale();

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

    const formatedProductItem = injectProductListExtraData(productItem);

    const productListsArray = yield call(
      sagaLocal.createItem,
      formatedProductItem,
      listId,
    );
    yield put(productListActions.setProductLists(productListsArray));

    if (productItem.dueDate) {
      const notificationDate = addRemoveDays(-2, productItem.dueDate);
      yield put(
        notificationActions.scheduleLocalNotificationAsync({
          date: notificationDate,
          message: strings.productItems.productExpireInDay(
            productItem.name,
            formatDate(productItem.dueDate),
          ),
          playSound: true,
          title: productItem.name,
        }),
      );
    }
    yield call(navigationService.goBack);

    yield call(sagaServer.createItem, formatedProductItem, listId);
  } catch (err) {
    yield put(productListActions.setError(err.message));
  }
}

export function* requestItems(props: ProductListAction<{ listId: string }>) {
  try {
    const { listId } = props.payload;
    yield put(productListActions.setError());

    const cachedProductItems = yield select(selectors.getProductItems, listId);

    const serverProductItems = yield call(sagaServer.requestItems, listId);

    const productItems = serverProductItems || cachedProductItems;

    const productListsArray = yield call(
      sagaLocal.requestItems,
      productItems,
      listId,
    );

    yield put(productListActions.setProductLists(productListsArray));
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

    const newProductItemsArray = yield call(
      sagaLocal.deleteItem,
      listId,
      itemId,
    );

    yield put(productListActions.setProductLists(newProductItemsArray));

    yield call(sagaServer.deleteItem, listId, itemId);
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

    const productListsArray = yield call(
      sagaLocal.updateItem,
      formatedProductItem,
      listId,
    );

    yield put(productListActions.setProductLists(productListsArray));
    yield call(navigationService.goBack);

    yield call(sagaServer.updateItem, formatedProductItem, listId);
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
  takeLatest(ProductListTypes.REQUEST_ITEMS, requestItems),
  takeLatest(ProductListTypes.DELETE_ITEM, deleteItem),
  takeLatest(ProductListTypes.UPDATE_ITEM, updateItem),
];
