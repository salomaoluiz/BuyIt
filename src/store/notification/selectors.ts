import { RootState } from '@store/reducers';

const getState = (state: RootState) => state.notificationReducer;
const getBanner = (state: RootState) => state.notificationReducer.banner;
const getScheduledNotifications = (state: RootState) =>
  state.notificationReducer.scheduledNotifications;

export { getState, getScheduledNotifications, getBanner };
