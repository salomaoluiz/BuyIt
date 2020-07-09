export enum NotificationTypes {
  SEND_NOTIFICATION = '@@NOTIFICATION/SEND_NOTIFICATION',
  SEND_NOTIFICATION_ASYNC = '@@NOTIFICATION/SEND_NOTIFICATION_ASYNC',
  DISMISS_NOTIFICATION = '@@NOTIFICATION/DISMISS_NOTIFICATION',
}

export type NotificationProps = {
  title?: string;
  body?: string;
  icon?: string;
};

export interface NotificationState extends NotificationProps {
  isVisible: boolean;
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
