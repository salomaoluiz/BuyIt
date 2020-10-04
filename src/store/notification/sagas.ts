import {
  NotificationProps,
  NotificationTypes,
  NotificationAction,
} from './types';
import { put, delay, takeLatest } from 'redux-saga/effects';
import { notificationActions } from '.';
import { animation } from '@styles';
import appLocale from '@locales';

const strings = appLocale();

export function* sendNotificationAsync(
  props: NotificationAction<NotificationProps>,
) {

  const body = props.payload?.body;
    const icon = props.payload?.icon;

  if (!body) {
    throw new Error(strings.errors.general.opsWeHaveAProblem);
  }

  yield put(notificationActions.sendNotification({ body, icon }));

  yield delay(animation.notificationVisibleTiming);

  yield put(notificationActions.dismissNotification());
}

export default [
  takeLatest(NotificationTypes.SEND_NOTIFICATION_ASYNC, sendNotificationAsync),
];
