import { notificationActions } from '../';
import { NotificationTypes } from '../types';

describe('Notification Actions', () => {
  jest.useFakeTimers();
  test('testando a action showBannerAsync', () => {
    const mockProps = {
      title: 'title',
      body: 'body',
      icon: 'alert',
    };
    const response = notificationActions.showBannerAsync(mockProps);

    expect(response.type).toEqual(NotificationTypes.SHOW_BANNER_ASYNC);
    expect(response.payload).toEqual({ banner: { ...mockProps } });
  });

  test('testando a action showBanner', () => {
    const mockProps = {
      title: 'title',
      body: 'body',
      icon: 'alert',
    };
    const response = notificationActions.showBanner(mockProps);

    expect(response.type).toEqual(NotificationTypes.SHOW_BANNER);
    expect(response.payload).toEqual({ banner: { ...mockProps } });
  });

  test('testando a action scheduleLocalNotificationAsync', () => {
    const mockProps = {
      id: 123456,
      date: new Date(Date.now()),
      message: 'Message Teste',
    };
    const response = notificationActions.scheduleLocalNotificationAsync(
      mockProps,
    );

    expect(response.type).toEqual(
      NotificationTypes.SCHEDULE_NOTIFICATION_ASYNC,
    );
    expect(response.payload).toEqual({ ...mockProps });
  });

  test('testando a action scheduleLocalNotificationAsync', () => {
    const mockProps = [
      {
        id: 123456,
        date: new Date(Date.now()),
        message: 'Message Teste',
      },
    ];
    const response = notificationActions.scheduleLocalNotification(mockProps);

    expect(response.type).toEqual(NotificationTypes.SCHEDULE_NOTIFICATIONS);
    expect(response.payload).toEqual({ scheduledNotifications: mockProps });
  });

  test('testando a action syncScheduleLocalNotificationAsync', () => {
    const mockProps = [
      {
        id: 123456,
        date: new Date(Date.now()),
        message: 'Message Teste',
        title: 'mock title',
        body: '',
        soundName: '',
        repeatInterval: 0,
        number: 0,
      },
    ];
    
    const response = notificationActions.syncScheduleLocalNotificationAsync(
      mockProps,
    );

    expect(response.type).toEqual(
      NotificationTypes.SYNC_SCHEDULE_NOTIFICATION_ASYNC,
    );
    expect(response.payload).toEqual({ scheduledNotifications: mockProps });
  });

  test('testando a action dismissBanner', () => {
    const response = notificationActions.dismissBanner();

    expect(response.type).toEqual(NotificationTypes.DISMISS_BANNER);
  });
});
