import PushNotification, {
  PushNotificationObject,
  PushNotificationScheduledLocalObject,
  PushNotificationScheduleObject,
} from 'react-native-push-notification';

export enum ChannelID {
  MAIN_CHANNEL = 'main-channel',
}

const createChannel = (callbackSuccess: (created: boolean) => void) => {
  PushNotification.createChannel(
    { channelId: ChannelID.MAIN_CHANNEL, channelName: ChannelID.MAIN_CHANNEL },
    callbackSuccess,
  );
};

const cancelAllLocalNotifications = () => {
  PushNotification.cancelAllLocalNotifications();
};

const scheduleLocalNotification = (
  notification: PushNotificationScheduleObject,
) => {
  const newNotification = {
    ...notification,
    channelId: ChannelID.MAIN_CHANNEL,
  };
  PushNotification.localNotificationSchedule(newNotification);

  return newNotification;
};

const cancelLocalNotification = (id: string) => {
  PushNotification.cancelLocalNotifications({ id });
};

const getAllScheduledLocalNotifications = (
  callback: (notification: PushNotificationScheduledLocalObject[]) => void,
) => {
  PushNotification.getScheduledLocalNotifications(callback);
};

const dispatchLocalNotification = (notification: PushNotificationObject) => {
  PushNotification.localNotification({
    ...notification,
    channelId: ChannelID.MAIN_CHANNEL,
  });
};

export const pushNotification = {
  cancelAllLocalNotifications,
  scheduleLocalNotification,
  getAllScheduledLocalNotifications,
  cancelLocalNotification,
  dispatchLocalNotification,
  createChannel,
};
