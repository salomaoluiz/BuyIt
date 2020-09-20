import { AppStateMockBuilder } from '@store/__mocks__/AppStateMockBuilder.mock';

import { notificationSelector } from '..';

describe('Notification Selectors', () => {
  test('deve retornar o state corretamente', () => {
    const mockData = new AppStateMockBuilder().withNotification({
      isVisible: false,
    });

    const response = notificationSelector.getState(mockData);

    expect(response).toEqual(mockData.notificationReducer);
  });
});
