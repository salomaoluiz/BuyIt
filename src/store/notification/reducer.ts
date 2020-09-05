import {
  NotificationState,
  NotificationTypes,
  NotificationReducer,
  NotificationReducerAction,
} from './types';

const initialState: NotificationState = {
  title: undefined,
  body: undefined,
  icon: undefined,
  isVisible: false,
};

const sendNotification = (
  state: NotificationState,
  action: NotificationReducerAction,
): NotificationState => ({
  body: action.payload?.body,
  title: action.payload?.title,
  icon: action.payload?.icon,
  isVisible: true,
});

const dismissNotification = () => ({ ...initialState });

const notificationReducerMap = new Map<NotificationTypes, NotificationReducer>([
  [NotificationTypes.SEND_NOTIFICATION, sendNotification],
  [NotificationTypes.DISMISS_NOTIFICATION, dismissNotification],
]);

const reducer = (
  state: NotificationState = initialState,
  action: NotificationReducerAction,
) => {
  const notificationReducer = notificationReducerMap.get(action.type);

  if (notificationReducer) return notificationReducer(state, action);

  return state;
};

export default reducer;
