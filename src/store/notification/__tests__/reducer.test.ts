import notificationReducers from '../reducer';
import { NotificationState } from '../types';
import { notificationActions } from '..';

describe('Notification Reducer', () => {
  const initialState: NotificationState = {
    title: undefined,
    body: undefined,
    icon: undefined,
    isVisible: false,
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
      title: 'title',
      body: 'body',
      icon: 'alert',
    };

    const action = notificationActions.sendNotification(mockProps);

    const response = notificationReducers(initialState, action);

    expect(response).toEqual({
      ...mockProps,
      isVisible: true,
    });
  });
});
