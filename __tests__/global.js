jest.mock('react-native-push-notification', () => ({
  cancelAllLocalNotifications: jest.fn(),
  localNotificationSchedule: jest.fn(),
  cancelLocalNotifications: jest.fn(),
  getScheduledLocalNotifications: jest.fn(),
  localNotification: jest.fn(),
  createChannel: jest.fn(),
}));
jest.mock('@react-native-firebase/auth', () => ({}));
jest.mock('@react-native-firebase/admob', () => ({}));

jest.mock('@react-native-firebase/firestore', () =>
  jest.fn().mockReturnValue({
    collection: jest.fn().mockReturnValue({
      doc: jest.fn().mockReturnValue({
        set: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        get: jest.fn(),
      }),
      get: jest.fn(),
    }),
  }),
);

