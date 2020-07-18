import { all } from 'redux-saga/effects';
import notificationSagas from './notification/sagas';

function* rootSagas() {
  yield all([...notificationSagas]);
}

export default rootSagas;
