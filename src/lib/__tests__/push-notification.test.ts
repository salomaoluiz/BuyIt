import PushNotification from 'react-native-push-notification';

import { ChannelID, pushNotification } from '@lib/push-notification';

describe('Testes da lib PushNotification', () => {
  const localNotificationScheduleSpy = jest.spyOn(
    PushNotification,
    'localNotificationSchedule',
  );
  const cancelLocalNotificationsSpy = jest.spyOn(
    PushNotification,
    'cancelLocalNotifications',
  );
  const cancelAllLocalNotificationsSpy = jest.spyOn(
    PushNotification,
    'cancelAllLocalNotifications',
  );
  const localNotificationSpy = jest.spyOn(
    PushNotification,
    'localNotification',
  );
  const createChannelSpy = jest.spyOn(PushNotification, 'createChannel');
  const getScheduledLocalNotificationsSpy = jest
    .spyOn(PushNotification, 'getScheduledLocalNotifications')
    .mockImplementation(() => {
      return () => ({ id: '123456' });
    });

  test('deve agendar uma notificação local e retornar ela', () => {
    const notification = {
      date: new Date(Date.now()),
      message: 'Mock Message',
    };

    const response = pushNotification.scheduleLocalNotification(notification);

    const expected = {
      ...notification,
      channelId: ChannelID.MAIN_CHANNEL,
    };
    expect(localNotificationScheduleSpy).toHaveBeenCalledWith(expected);
    expect(response).toEqual(expected);
  });

  test('deve cancelar todas as notificações locais', () => {
    pushNotification.cancelAllLocalNotifications();

    expect(cancelAllLocalNotificationsSpy).toHaveBeenCalledWith();
  });

  test('deve cancelar uma notificação local por seu id', () => {
    const id = '12345';
    pushNotification.cancelLocalNotification(id);

    expect(cancelLocalNotificationsSpy).toHaveBeenCalledWith({ id });
  });

  test('deve obter todas as notificações agendadas', () => {
    const func = jest.fn();

    pushNotification.getAllScheduledLocalNotifications(func);

    expect(getScheduledLocalNotificationsSpy).toHaveBeenCalledWith(func);
  });

  test('deve disparar uma notificação', () => {
    const notification = {
      message: 'Mensagem',
    };
    pushNotification.dispatchLocalNotification(notification);

    expect(localNotificationSpy).toHaveBeenCalledWith({
      ...notification,
      channelId: ChannelID.MAIN_CHANNEL,
    });
  });

  test('deve criar um channel', () => {
    const func = jest.fn();
    pushNotification.createChannel(func);

    expect(createChannelSpy).toHaveBeenCalledWith(
      {
        channelId: ChannelID.MAIN_CHANNEL,
        channelName: ChannelID.MAIN_CHANNEL,
      },
      func,
    );
  });
});
