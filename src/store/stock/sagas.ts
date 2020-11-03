import { takeLatest, put, call } from 'redux-saga/effects';
import { StockTypes, StockActions } from './types';
import { stockActions } from '.';
import navigationService from '@navigator/services/navigationService';
import { injectStockItemExtraData } from './utils';
import * as sagaServer from './sagas-server';
import * as sagaLocal from './sagas-local';
import { ProductItem } from '@store/product-list/types';
import { addRemoveDays, formatDate } from '@utils/date';
import { notificationActions } from '@store/notification';
import appLocale from '@locales';

const strings = appLocale();

export function* createStockAsync(
  props: StockActions<{ stockItem: ProductItem }>,
) {
  try {
    const { stockItem } = props.payload;
    yield put(stockActions.setError());
    yield put(stockActions.setLoading(true));

    const formatedStock = injectStockItemExtraData(stockItem);

    const stocksArray = yield call(sagaLocal.createStockItem, formatedStock);
    yield put(stockActions.setStock(stocksArray));

    if (stockItem.dueDate) {
      const notificationDate = addRemoveDays(-2, stockItem.dueDate);
      yield put(
        notificationActions.scheduleLocalNotificationAsync({
          date: notificationDate,
          message: strings.productItems.productExpireInDay(
            stockItem.name,
            formatDate(stockItem.dueDate),
          ),
          playSound: true,
          title: stockItem.name,
        }),
      );
    }

    yield call(navigationService.goBack);

    yield call(sagaServer.createStockItem, formatedStock);
  } catch (err) {
    yield put(stockActions.setError(err.message));
  } finally {
    yield put(stockActions.setLoading(false));
  }
}

export function* getStocksAsync() {
  try {
    yield put(stockActions.setError());
    yield put(stockActions.setLoading(true));

    const productItems = yield call(sagaServer.getStockItems);

    const stocksArray = yield call(sagaLocal.getStockItems);

    yield put(stockActions.setStock(productItems || stocksArray));
  } catch (err) {
    yield put(stockActions.setError(err.message));
  } finally {
    yield put(stockActions.setLoading(false));
  }
}

export function* deleteStockAsync(props: StockActions<{ itemId: string }>) {
  try {
    const { itemId } = props.payload;
    yield put(stockActions.setError());
    yield put(stockActions.setLoading(true));

    const newStocksArray = yield call(sagaLocal.deleteStockItem, itemId);

    yield put(stockActions.setStock(newStocksArray));

    yield call(sagaServer.deleteStockItem, itemId);
  } catch (err) {
    yield put(stockActions.setError(err.message));
  } finally {
    yield put(stockActions.setLoading(false));
  }
}

export function* updateStockAsync(
  props: StockActions<{ stockItem: ProductItem }>,
) {
  try {
    const { stockItem } = props.payload;
    yield put(stockActions.setError());
    yield put(stockActions.setLoading(true));

    const updatedStockItem = injectStockItemExtraData(stockItem);

    const stocksArray = yield call(sagaLocal.updateStockItem, updatedStockItem);

    yield put(stockActions.setStock(stocksArray));
    yield call(navigationService.goBack);

    yield call(sagaServer.updateStockItem, updatedStockItem);
  } catch (err) {
    yield put(stockActions.setError(err.message));
  } finally {
    yield put(stockActions.setLoading(false));
  }
}

export default [
  takeLatest(StockTypes.CREATE_ITEM_ASYNC, createStockAsync),
  takeLatest(StockTypes.GET_STOCK_ASYNC, getStocksAsync),
  takeLatest(StockTypes.DELETE_ITEM_ASYNC, deleteStockAsync),
  takeLatest(StockTypes.UPDATE_ITEM_ASYNC, updateStockAsync),
];
