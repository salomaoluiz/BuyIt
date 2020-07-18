import { notificationSelector } from '..';
import { mockReducerInitialState } from 'src/__tests__/mocks';

describe('Notification Selectors', () => {
  test('deve retornar o state corretamente', () => {
    const response = notificationSelector.getState(mockReducerInitialState);

    expect(response).toEqual(mockReducerInitialState.notificationReducers);
  });
});
