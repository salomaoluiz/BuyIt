import { notificationActions } from '..';
import { NotificationTypes } from '../types';

describe('Notification Actions', () => {
  test('testando a action sendNotificationAsync', () => {
    const mockProps = {
      title: 'title',
      body: 'body',
      icon: 'alert',
    };
    const response = notificationActions.sendNotificationAsync(mockProps);

    expect(response.type).toEqual(NotificationTypes.SEND_NOTIFICATION_ASYNC);
    expect(response.payload).toEqual(mockProps);
  });

  test('testando a action sendNotification', () => {
    const mockProps = {
      title: 'title',
      body: 'body',
      icon: 'alert',
    };
    const response = notificationActions.sendNotification(mockProps);

    expect(response.type).toEqual(NotificationTypes.SEND_NOTIFICATION);
    expect(response.payload).toEqual(mockProps);
  });

  test('testando a action dismissNotification', () => {
    const response = notificationActions.dismissNotification();

    expect(response.type).toEqual(NotificationTypes.DISMISS_NOTIFICATION);
  });
});
