import {
  PushNotificationScheduledLocalObject,
  PushNotificationScheduleObject,
} from 'react-native-push-notification';

import {
  NotificationTypes,
  NotificationAction,
  BannerProps,
  BannerButton,
} from './types';

const actions = {
  showBannerAsync: (props: {
    body: string;
    icon?: string;
    firstAction?: BannerButton;
    secondAction?: BannerButton;
  }): NotificationAction<BannerProps> => ({
    type: NotificationTypes.SHOW_BANNER_ASYNC,
    payload: { banner: { ...props } },
  }),
  showBanner: (props: {
    body: string;
    icon?: string;
    firstAction?: BannerButton;
    secondAction?: BannerButton;
  }): NotificationAction<BannerProps> => ({
    type: NotificationTypes.SHOW_BANNER,
    payload: { banner: { ...props } },
  }),
  scheduleLocalNotificationAsync: (
    props: PushNotificationScheduleObject,
  ): NotificationAction<PushNotificationScheduleObject> => ({
    type: NotificationTypes.SCHEDULE_NOTIFICATION_ASYNC,
    payload: { ...props },
  }),
  syncScheduleLocalNotificationAsync: (
    props: PushNotificationScheduledLocalObject[],
  ): NotificationAction<{
    scheduledNotifications: PushNotificationScheduledLocalObject[];
  }> => ({
    type: NotificationTypes.SYNC_SCHEDULE_NOTIFICATION_ASYNC,
    payload: { scheduledNotifications: props },
  }),
  scheduleLocalNotification: (
    props: PushNotificationScheduleObject[],
  ): NotificationAction<{
    scheduledNotifications: PushNotificationScheduleObject[];
  }> => ({
    type: NotificationTypes.SCHEDULE_NOTIFICATIONS,
    payload: { scheduledNotifications: props },
  }),
  dismissBanner: () => ({
    type: NotificationTypes.DISMISS_BANNER,
  }),
};

export default actions;
