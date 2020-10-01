import notificationReducers from '../reducer';
import { NotificationState } from '../types';
import { notificationActions } from '..';

describe('Notification Reducer', () => {
  const initialState: NotificationState = {
    body: undefined,
    icon: undefined,
    isVisible: false,
    firstAction: undefined,
    secondAction: undefined,
  };

  test('deve retornar o state se não for passado nenhuma action', () => {
    const action = { type: 'any', payload: {} };

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const response = notificationReducers(initialState, action);

    expect(response).toEqual(initialState);
  });

  test('deve retornar o initialState se for chamado o dismissNotification', () => {
    const action = notificationActions.dismissNotification();

    const response = notificationReducers(initialState, action);

    expect(response).toEqual(initialState);
  });

  test('deve setar os valores se chamado o sendNotification', () => {
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

    const action = notificationActions.sendNotification(mockProps);

    const response = notificationReducers(initialState, action);

    expect(response).toEqual({
      ...mockProps,
      isVisible: true,
    });
  });
});
