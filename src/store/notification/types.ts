import { PushNotificationScheduleObject } from 'react-native-push-notification';

export enum NotificationTypes {
  SHOW_BANNER = '@@NOTIFICATION/SHOW_BANNER',
  SHOW_BANNER_ASYNC = '@@NOTIFICATION/SHOW_BANNER_ASYNC',
  DISMISS_BANNER = '@@NOTIFICATION/DISMISS_BANNER',
  SYNC_SCHEDULE_NOTIFICATION_ASYNC = '@@NOTIFICATION/SYNC_SCHEDULE_NOTIFICATION_ASYNC',
  SCHEDULE_NOTIFICATION_ASYNC = '@@NOTIFICATION/SCHEDULE_NOTIFICATION_ASYNC',
  SCHEDULE_NOTIFICATIONS = '@@NOTIFICATION/SCHEDULE_NOTIFICATIONS',
}

export interface BannerButton {
  label: string;
  onPress: () => void;
}

export type BannerProps = {
  banner: {
    body?: string;
    icon?: string;
    firstAction?: BannerButton;
    secondAction?: BannerButton;
    isVisible?: boolean;
  };
};

export interface NotificationState extends BannerProps {
  scheduledNotifications: PushNotificationScheduleObject[];
}

export type NotificationAction<Payload> = {
  type: NotificationTypes;
  payload?: Payload;
};

export type NotificationReducer = (
  state: NotificationState,
  action: NotificationReducerAction,
) => NotificationState;

export type NotificationReducerAction = NotificationAction<
  Partial<NotificationState>
>;
