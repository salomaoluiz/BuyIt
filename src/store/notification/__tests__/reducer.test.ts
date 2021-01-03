import { notificationActions } from '../';
import notificationReducers from '../reducer';
import { NotificationState } from '../types';

describe('Notification Reducer', () => {
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

  test('deve retornar o state se não for passado nenhuma action', () => {
    const action = { type: 'any', payload: {} };

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const response = notificationReducers(initialState, action);

    expect(response).toEqual(initialState);
  });

  test('deve retornar o initialState se for chamado o dismissNotification', () => {
    const action = notificationActions.dismissBanner();

    const response = notificationReducers(initialState, action);

    expect(response).toEqual(initialState);
  });

  test('deve setar os valores se chamado o showBanner', () => {
    const mockProps = {
      body: 'body',
      icon: 'alert',
      isVisible: true,
      firstAction: {
        label: 'Dismiss',
        onPress: expect.any(Function),
      },
      secondAction: undefined,
    };

    const action = notificationActions.showBanner(mockProps);

    const response = notificationReducers(initialState, action);

    expect(response.banner).toEqual({
      ...mockProps,
      isVisible: true,
    });
  });

  test('deve setar os valores se chamado o scheduleNotifications', () => {
    const mockProps = [
      {
        id: 123456,
        date: new Date(Date.now()),
        message: 'Message Teste',
      },
    ];

    const action = notificationActions.scheduleLocalNotification(mockProps);

    const response = notificationReducers(initialState, action);

    expect(response.scheduledNotifications).toEqual(mockProps);
  });
});
