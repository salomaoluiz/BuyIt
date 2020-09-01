import { all } from 'redux-saga/effects';

import authSagas from './auth/sagas';
import notificationSagas from './notification/sagas';
import productListSagas from './product-list/sagas';

function* rootSagas() {
  yield all([...authSagas, ...notificationSagas, ...productListSagas]);
}

export default rootSagas;
