import {
  NotificationTypes,
  NotificationAction,
  NotificationProps,
} from './types';

const actions = {
  sendNotificationAsync: (props: {
    title: string;
    body: string;
    icon?: string;
  }): NotificationAction<NotificationProps> => ({
    type: NotificationTypes.SEND_NOTIFICATION_ASYNC,
    payload: { ...props },
  }),
  sendNotification: (props: {
    title: string;
    body: string;
    icon?: string;
  }): NotificationAction<NotificationProps> => ({
    type: NotificationTypes.SEND_NOTIFICATION,
    payload: { ...props },
  }),
  dismissNotification: () => ({
    type: NotificationTypes.DISMISS_NOTIFICATION,
  }),
};

export default actions;
