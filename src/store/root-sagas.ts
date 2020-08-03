import { all } from 'redux-saga/effects';

import authSagas from './auth/sagas';
import notificationSagas from './notification/sagas';

function* rootSagas() {
  yield all([...authSagas, ...notificationSagas]);
}

export default rootSagas;
