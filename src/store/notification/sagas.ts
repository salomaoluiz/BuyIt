import {
  PushNotificationScheduledLocalObject,
  PushNotificationScheduleObject,
} from 'react-native-push-notification';
import { put, delay, takeLatest, select } from 'redux-saga/effects';

import { pushNotification } from '@lib/push-notification';
import { translate } from '@locales';
import { animation } from '@styles';
import { syncTwoArraysByID } from '@utils/filters';
import { randomNumberId } from '@utils/id';

import { notificationActions, notificationSelector } from './';
import { BannerProps, NotificationTypes, NotificationAction } from './types';

export function* showBannerAsync(props: NotificationAction<BannerProps>) {
  const body = props.payload?.banner.body;
  const firstAction = props.payload?.banner.firstAction;
  const secondAction = props.payload?.banner.secondAction;
  const icon = props.payload?.banner.icon;

  if (!body) {
    throw new Error(translate('errors.general.opsWeHaveAProblem'));
  }

  yield put(
    notificationActions.showBanner({
      body,
      icon,
      firstAction,
      secondAction,
    }),
  );

  yield delay(animation.notificationVisibleTiming);

  yield put(notificationActions.dismissBanner());
}

export function* scheduleLocalNotificationAsync(
  props: NotificationAction<PushNotificationScheduleObject>,
) {
  const { payload } = props;

  if (payload) {
    const randomId = randomNumberId();

    const notification = {
      ...payload,
      id: randomId,
      playSound: true,
    };

    pushNotification.scheduleLocalNotification({
      ...notification,
    });

    const notificationsScheduled: PushNotificationScheduleObject[] = yield select(
      notificationSelector.getScheduledNotifications,
    );

    const newNotificationsList = notificationsScheduled.concat(notification);

    yield put(
      notificationActions.scheduleLocalNotification(newNotificationsList),
    );
  }
}

export function* syncScheduleLocalNotificationAsync(
  props: NotificationAction<{
    scheduledNotifications: PushNotificationScheduledLocalObject[];
  }>,
) {
  const { payload } = props;

  if (payload) {
    const notificationScheduled: PushNotificationScheduleObject[] = yield select(
      notificationSelector.getScheduledNotifications,
    );

    const newListNotification = syncTwoArraysByID(
      notificationScheduled,
      payload.scheduledNotifications,
    );

    yield put(
      notificationActions.scheduleLocalNotification(newListNotification),
    );
  }
}
export default [
  takeLatest(
    NotificationTypes.SCHEDULE_NOTIFICATION_ASYNC,
    scheduleLocalNotificationAsync,
  ),
  takeLatest(
    NotificationTypes.SYNC_SCHEDULE_NOTIFICATION_ASYNC,
    syncScheduleLocalNotificationAsync,
  ),
  takeLatest(NotificationTypes.SHOW_BANNER_ASYNC, showBannerAsync),
];
