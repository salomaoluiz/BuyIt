import {
  NotificationProps,
  NotificationTypes,
  NotificationAction,
} from './types';
import { put, delay, takeLatest } from 'redux-saga/effects';
import { notificationActions } from '.';
import errorsString from '@locales/general-errors';
import { animation } from '@styles';

export function* sendNotificationAsync(
  props: NotificationAction<NotificationProps>,
) {
  const body = props.payload?.body;
  const title = props.payload?.title;
  const icon = props.payload?.icon;

  if (!title || !body) {
    throw new Error(errorsString.devErrors.insertRequiredValues);
  }

  yield put(notificationActions.sendNotification({ title, body, icon }));

  yield delay(animation.notificationVisibleTiming);

  yield put(notificationActions.dismissNotification());
}

export default [
  takeLatest(NotificationTypes.SEND_NOTIFICATION_ASYNC, sendNotificationAsync),
];
