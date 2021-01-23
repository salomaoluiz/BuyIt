import { put, delay, select } from 'redux-saga/effects';

import { ChannelID, pushNotification } from '@lib/push-notification';
import { translate } from '@locales';
import { animation } from '@styles';
import * as utilIds from '@utils/id';

import { notificationActions, notificationSelector } from '../';
import * as sagas from '../sagas';
import { NotificationTypes } from '../types';

jest.mock('react-native-push-notification', () => ({
  localNotificationSchedule: jest.fn(),
}));
describe('Notification Sagas', () => {
  const scheduleNotificationSpy = jest.spyOn(
    pushNotification,
    'scheduleLocalNotification',
  );
  const randomNumberIdSpy = jest
    .spyOn(utilIds, 'randomNumberId')
    .mockReturnValue(12345);

  test('deve mostrar um banner e apos um tempo limpa-la ', async () => {
    const mockProps = {
      type: NotificationTypes.SHOW_BANNER_ASYNC,
      payload: {
        banner: {
          body: 'body',
          icon: 'alert',
        },
      },
    };

    const gen = sagas.showBannerAsync(mockProps);

    expect(await gen.next().value).toEqual(
      put(notificationActions.showBanner({ ...mockProps.payload.banner })),
    );

    expect(await gen.next().value).toEqual(
      delay(animation.notificationVisibleTiming),
    );

    expect(await gen.next().value).toEqual(
      put(notificationActions.dismissBanner()),
    );

    expect(await gen.next().done).toBe(true);
  });

  test('caso o title ou o body esteja vazio, deve quebrar a exibição do banner', async () => {
    const action = notificationActions.showBannerAsync({
      body: '',
      icon: 'alert',
    });

    const gen = sagas.showBannerAsync(action);

    expect(() => gen.next().value).toThrowError(
      new Error(translate('errors.general.opsWeHaveAProblem')),
    );
  });

  test('deve agendar uma notificação e salvar no redux as notificações agendadas', async () => {
    const notificationMock = {
      message: 'mock message',
      date: new Date(Date.now()),
    };
    const action = notificationActions.scheduleLocalNotificationAsync(
      notificationMock,
    );

    const gen = sagas.scheduleLocalNotificationAsync(action);

    expect(gen.next().value).toEqual(
      select(notificationSelector.getScheduledNotifications),
    );
    expect(randomNumberIdSpy).toHaveBeenCalled();
    const notification = {
      ...notificationMock,
      id: 12345,
      playSound: true,
    };
    expect(scheduleNotificationSpy).toHaveReturnedWith({
      ...notification,
      channelId: ChannelID.MAIN_CHANNEL,
    });

    expect(gen.next([]).value).toEqual(
      put(notificationActions.scheduleLocalNotification([notification])),
    );
    expect(gen.next().done).toEqual(true);
  });

  test('deve sincronizar as notificações e salvar no redux as notificações agendadas', async () => {
    const notificationMock = [
      {
        message: 'mock message',
        date: new Date(Date.now()),
        id: 123456,
        title: 'title',
        body: '',
        soundName: '',
        repeatInterval: 0,
        number: 0,
      },
    ];

    const action = notificationActions.syncScheduleLocalNotificationAsync(
      notificationMock,
    );

    const gen = sagas.syncScheduleLocalNotificationAsync(action);

    expect(gen.next().value).toEqual(
      select(notificationSelector.getScheduledNotifications),
    );
    const mockNewListNotification = [
      {
        message: 'mock message',
        date: new Date(Date.now()),
        id: 123456,
        title: 'title',
        soundName: '',
        number: 0,
      },
      {
        message: 'mock message 2',
        date: new Date(Date.now()),
        id: 654321,
        title: 'title 2',
        soundName: '',
        number: 0,
      },
    ];

    expect(gen.next(mockNewListNotification).value).toEqual(
      put(
        notificationActions.scheduleLocalNotification([
          mockNewListNotification[0],
        ]),
      ),
    );
    expect(gen.next().done).toEqual(true);
  });
});
