import {
  NotificationTypes,
  NotificationAction,
  NotificationProps,
  NotificationButton,
} from './types';

const actions = {
  sendNotificationAsync: (props: {
    body: string;
    icon?: string;
    firstAction?: NotificationButton;
    secondAction?: NotificationButton;
  }): NotificationAction<NotificationProps> => ({
    type: NotificationTypes.SEND_NOTIFICATION_ASYNC,
    payload: { ...props },
  }),
  sendNotification: (props: {
    body: string;
    icon?: string;
    firstAction?: NotificationButton;
    secondAction?: NotificationButton;
  }): NotificationAction<NotificationProps> => ({
    type: NotificationTypes.SEND_NOTIFICATION,
    payload: { ...props },
  }),
  dismissNotification: () => ({
    type: NotificationTypes.DISMISS_NOTIFICATION,
  }),
};

export default actions;
