import { takeLatest, put, call, select } from 'redux-saga/effects';

import appLocale from '@locales';
import navigationService from '@navigator/services/navigationService';
import { notificationActions } from '@store/notification';
import { addRemoveDays, formatDate } from '@utils/date';

import { productListActions } from './';
import * as sagaLocal from './sagas-local';
import * as sagaServer from './sagas-server';
import selectors from './selectors';
import {
  ProductListTypes,
  ProductListActions,
  ProductList,
  ProductLists,
  ProductItem,
} from './types';
import { injectProductListExtraData } from './utils';

const strings = appLocale();

export function* createProductListAsync(
  props: ProductListActions<{ productList: ProductList }>,
) {
  const { productList } = props.payload;
  try {
    yield put(productListActions.setError());
    yield put(productListActions.setLoading(true));
    const ajustedProductList = injectProductListExtraData(productList);

    const newProductListsArray = yield call(
      sagaLocal.createProductList,
      ajustedProductList,
    );

    yield put(productListActions.setProductLists(newProductListsArray));
    yield call(navigationService.goBack);

    yield call(sagaServer.createProductList, ajustedProductList);
  } catch (err) {
    yield put(productListActions.setError(err.message));
  } finally {
    yield put(productListActions.setLoading(false));
  }
}

export function* getProductListsAsync() {
  try {
    yield put(productListActions.setError());
    yield put(productListActions.setLoading(true));

    const serverProductLists = yield call(sagaServer.getProductLists);

    if (serverProductLists) {
      yield put(productListActions.setProductLists(serverProductLists));
    }
  } catch (err) {
    yield put(productListActions.setError(err.message));
  } finally {
    yield put(productListActions.setLoading(false));
  }
}

export function* updateProductListAsync(
  props: ProductListActions<{ productList: ProductList }>,
) {
  const { productList } = props.payload;
  try {
    yield put(productListActions.setError());
    yield put(productListActions.setLoading(true));

    const ajustedProductList = injectProductListExtraData(productList);

    const updatedProductLists = yield call(
      sagaLocal.updateProductList,
      ajustedProductList,
    );

    yield put(productListActions.setProductLists(updatedProductLists));
    yield call(navigationService.goBack);

    yield call(sagaServer.updateProductList, ajustedProductList);
  } catch (err) {
    yield put(productListActions.setError(err.message));
  } finally {
    yield put(productListActions.setLoading(false));
  }
}

export function* deleteProductListAsync(
  props: ProductListActions<{ listId: string }>,
) {
  const { listId } = props.payload;
  try {
    yield put(productListActions.setError());
    yield put(productListActions.setLoading(true));

    const filteredList: ProductLists = yield call(
      sagaLocal.deleteProductList,
      listId,
    );
    yield put(productListActions.setProductLists(filteredList));

    yield call(sagaServer.deleteProductList, listId);
  } catch (err) {
    yield put(productListActions.setError(err.message));
  } finally {
    yield put(productListActions.setLoading(false));
  }
}

export function* createProductItemAsync(
  props: ProductListActions<{ productItem: ProductItem; listId: string }>,
) {
  try {
    const { productItem, listId } = props.payload;
    yield put(productListActions.setError());
    yield put(productListActions.setLoading(true));

    const formatedProductItem = injectProductListExtraData(productItem);

    const productListsArray = yield call(
      sagaLocal.createProductItem,
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

    yield call(sagaServer.createProductItem, formatedProductItem, listId);
  } catch (err) {
    yield put(productListActions.setError(err.message));
  } finally {
    yield put(productListActions.setLoading(false));
  }
}

export function* getProductItemsAsync(
  props: ProductListActions<{ listId: string }>,
) {
  try {
    const { listId } = props.payload;
    yield put(productListActions.setError());
    yield put(productListActions.setLoading(true));
    const cachedProductItems = yield select(selectors.getProductItems, listId);

    const serverProductItems = yield call(sagaServer.getProductItems, listId);

    const productItems = serverProductItems || cachedProductItems;

    const productListsArray = yield call(
      sagaLocal.getProductItems,
      productItems,
      listId,
    );

    yield put(productListActions.setProductLists(productListsArray));
  } catch (err) {
    yield put(productListActions.setError(err.message));
  } finally {
    yield put(productListActions.setLoading(false));
  }
}

export function* deleteProductItemAsync(
  props: ProductListActions<{ listId: string; itemId: string }>,
) {
  try {
    const { listId, itemId } = props.payload;
    yield put(productListActions.setError());
    yield put(productListActions.setLoading(true));

    const newProductItemsArray = yield call(
      sagaLocal.deleteProductItem,
      listId,
      itemId,
    );

    yield put(productListActions.setProductLists(newProductItemsArray));

    yield call(sagaServer.deleteProductItem, listId, itemId);
  } catch (err) {
    yield put(productListActions.setError(err.message));
  } finally {
    yield put(productListActions.setLoading(false));
  }
}

export function* updateProductItemAsync(
  props: ProductListActions<{ productItem: ProductItem; listId: string }>,
) {
  try {
    const { productItem, listId } = props.payload;
    yield put(productListActions.setError());
    yield put(productListActions.setLoading(true));

    const formatedProductItem = injectProductListExtraData(productItem);

    const productListsArray = yield call(
      sagaLocal.updateProductItem,
      formatedProductItem,
      listId,
    );

    yield put(productListActions.setProductLists(productListsArray));
    yield call(navigationService.goBack);

    yield call(sagaServer.updateProductItem, formatedProductItem, listId);
  } catch (err) {
    yield put(productListActions.setError(err.message));
  } finally {
    yield put(productListActions.setLoading(false));
  }
}

export default [
  takeLatest(
    ProductListTypes.CREATE_PRODUCT_LIST_ASYNC,
    createProductListAsync,
  ),
  takeLatest(ProductListTypes.GET_PRODUCT_LISTS_ASYNC, getProductListsAsync),
  takeLatest(
    ProductListTypes.UPDATE_PRODUCT_LIST_ASYNC,
    updateProductListAsync,
  ),
  takeLatest(
    ProductListTypes.DELETE_PRODUCT_LIST_ASYNC,
    deleteProductListAsync,
  ),
  takeLatest(
    ProductListTypes.CREATE_PRODUCT_ITEM_ASYNC,
    createProductItemAsync,
  ),
  takeLatest(ProductListTypes.GET_PRODUCT_ITEMS_ASYNC, getProductItemsAsync),
  takeLatest(
    ProductListTypes.DELETE_PRODUCT_ITEM_ASYNC,
    deleteProductItemAsync,
  ),
  takeLatest(
    ProductListTypes.UPDATE_PRODUCT_ITEM_ASYNC,
    updateProductItemAsync,
  ),
];
