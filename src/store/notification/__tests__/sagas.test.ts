import { sendNotificationAsync } from '../sagas';
import { NotificationTypes } from '../types';
import { put, delay } from 'redux-saga/effects';
import { notificationActions } from '..';
import { animation } from '@styles';

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
});
