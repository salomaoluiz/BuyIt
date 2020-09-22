import { sendNotificationAsync } from '../sagas';
import { NotificationTypes } from '../types';
import { put, delay } from 'redux-saga/effects';
import { notificationActions } from '..';
import { animation } from '@styles';
import appLocale from '@locales';

const strings = appLocale();

describe('Notification Sagas', () => {
  test('deve enviar a notificacao e apos um tempo limpa-la ', async () => {
    const mockProps = {
      type: NotificationTypes.SEND_NOTIFICATION_ASYNC,
      payload: {
        title: 'title',
        body: 'body',
        icon: 'alert',
      },
    };

    const gen = sendNotificationAsync(mockProps);

    expect(await gen.next().value).toEqual(
      put(notificationActions.sendNotification({ ...mockProps.payload })),
    );

    expect(await gen.next().value).toEqual(
      delay(animation.notificationVisibleTiming),
    );

    expect(await gen.next().value).toEqual(
      put(notificationActions.dismissNotification()),
    );

    expect(await gen.next().done).toBe(true);
  });

  test('caso o title ou o body esteja vazio, deve quebrar', async () => {
    const action = notificationActions.sendNotificationAsync({
      title: '',
      body: 'body',
      icon: 'alert',
    });

    const gen = sendNotificationAsync(action);

    expect(() => gen.next().value).toThrowError(
      new Error(strings.errors.general.opsWeHaveAProblem),
    );
  });
});
