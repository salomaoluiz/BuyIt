import { AppStateMockBuilder } from '@store/__mocks__/AppStateMockBuilder.mock';

import { notificationSelector } from '../';

describe('Notification Selectors', () => {
  test('deve retornar o state corretamente', () => {
    const mockData = new AppStateMockBuilder().withNotification({
      banner: {},
      scheduledNotifications: [],
    });

    const response = notificationSelector.getState(mockData);

    expect(response).toEqual(mockData.notificationReducer);
  });

  test('deve retornar o banner corretamente', () => {
    const mockData = new AppStateMockBuilder().withNotification({
      banner: {},
      scheduledNotifications: [],
    });

    const response = notificationSelector.getBanner(mockData);

    expect(response).toEqual(mockData.notificationReducer.banner);
  });

  test('deve retornar o scheduledNotifications corretamente', () => {
    const mockData = new AppStateMockBuilder().withNotification({
      banner: {},
      scheduledNotifications: [],
    });

    const response = notificationSelector.getScheduledNotifications(mockData);

    expect(response).toEqual(
      mockData.notificationReducer.scheduledNotifications,
    );
  });
});
