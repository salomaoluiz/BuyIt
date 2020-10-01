import {
  NotificationState,
  NotificationTypes,
  NotificationReducer,
  NotificationReducerAction,
} from './types';

const initialState: NotificationState = {
  body: undefined,
  icon: undefined,
  isVisible: false,
  firstAction: undefined,
  secondAction: undefined,
};

const sendNotification = (
  state: NotificationState,
  action: NotificationReducerAction,
): NotificationState => ({
  body: action.payload?.body,
  icon: action.payload?.icon,
  firstAction: action.payload?.firstAction,
  secondAction: action.payload?.secondAction,
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
