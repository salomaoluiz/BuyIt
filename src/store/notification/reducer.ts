import {
  NotificationState,
  NotificationTypes,
  NotificationReducer,
  NotificationReducerAction,
} from './types';

const initialState: NotificationState = {
  banner: {
    body: undefined,
    icon: undefined,
    isVisible: false,
    firstAction: undefined,
    secondAction: undefined,
  },
  scheduledNotifications: [],
};

const showBanner = (
  state: NotificationState,
  action: NotificationReducerAction,
): NotificationState => ({
  ...state,
  banner: {
    body: action.payload?.banner?.body,
    icon: action.payload?.banner?.icon,
    firstAction: action.payload?.banner?.firstAction,
    secondAction: action.payload?.banner?.secondAction,
    isVisible: true,
  },
});

const dismissBanner = (state: NotificationState): NotificationState => ({
  ...state,
  banner: { ...initialState.banner },
});

const scheduleNotifications = (
  state: NotificationState,
  action: NotificationReducerAction,
): NotificationState => ({
  ...state,
  scheduledNotifications: action.payload?.scheduledNotifications || [],
});

const notificationReducerMap = new Map<NotificationTypes, NotificationReducer>([
  [NotificationTypes.SHOW_BANNER, showBanner],
  [NotificationTypes.DISMISS_BANNER, dismissBanner],
  [NotificationTypes.SCHEDULE_NOTIFICATIONS, scheduleNotifications],
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
