import { takeLatest, put, call } from 'redux-saga/effects';

import { translate } from '@locales';
import navigationService from '@navigator/services/navigationService';
import { notificationActions } from '@store/notification';
import { ProductItem } from '@store/product-list/types';
import { addRemoveDays, formatDate } from '@utils/date';

import { stockActions } from './';
import * as sagaLocal from './sagas-local';
import * as sagaServer from './sagas-server';
import { StockTypes, StockAction } from './types';
import { injectStockItemExtraData } from './utils';

export function* createItem(props: StockAction<{ stockItem: ProductItem }>) {
  try {
    const { stockItem } = props.payload;
    yield put(stockActions.setError());

    const formatedStock = injectStockItemExtraData(stockItem);

    const stocksArray = yield call(sagaLocal.createItem, formatedStock);
    yield put(stockActions.setStock(stocksArray));

    if (stockItem.dueDate) {
      const notificationDate = addRemoveDays(-2, stockItem.dueDate);
      yield put(
        notificationActions.scheduleLocalNotificationAsync({
          date: notificationDate,
          message: translate('productItems.productExpireInDay', {
            product: stockItem.name,
            date: formatDate(stockItem.dueDate),
          }),
          playSound: true,
          title: stockItem.name,
        }),
      );
    }

    yield call(navigationService.goBack);

    yield call(sagaServer.createItem, formatedStock);
  } catch (err) {
    yield put(stockActions.setError(err.message));
  }
}

export function* requestStock() {
  try {
    yield put(stockActions.setError());

    const productItems = yield call(sagaServer.requestStock);

    const stocksArray = yield call(sagaLocal.requestStock);

    yield put(stockActions.setStock(productItems || stocksArray));
  } catch (err) {
    yield put(stockActions.setError(err.message));
  }
}

export function* deleteItem(props: StockAction<{ itemId: string }>) {
  try {
    const { itemId } = props.payload;
    yield put(stockActions.setError());

    const newStocksArray = yield call(sagaLocal.deleteItem, itemId);

    yield put(stockActions.setStock(newStocksArray));

    yield call(sagaServer.deleteItem, itemId);
  } catch (err) {
    yield put(stockActions.setError(err.message));
  }
}

export function* updateItem(props: StockAction<{ stockItem: ProductItem }>) {
  try {
    const { stockItem } = props.payload;
    yield put(stockActions.setError());

    const updatedStockItem = injectStockItemExtraData(stockItem);

    const stocksArray = yield call(sagaLocal.updateItem, updatedStockItem);

    yield put(stockActions.setStock(stocksArray));
    yield call(navigationService.goBack);

    yield call(sagaServer.updateItem, updatedStockItem);
  } catch (err) {
    yield put(stockActions.setError(err.message));
  }
}

export default [
  takeLatest(StockTypes.CREATE_ITEM, createItem),
  takeLatest(StockTypes.REQUEST_STOCK, requestStock),
  takeLatest(StockTypes.DELETE_ITEM, deleteItem),
  takeLatest(StockTypes.UPDATE_ITEM, updateItem),
];
