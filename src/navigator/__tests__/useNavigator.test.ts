import { renderHook } from '@testing-library/react-hooks';
import * as reactRedux from 'react-redux';

import { pushNotification } from '@lib/push-notification';
import useNavigator from '@navigator/useNavigator';
import { authSelectors } from '@store/auth';
import { generalSelector } from '@store/general';

describe('Testando o Rehydrate', () => {
  const dispatch = jest.fn();

  const useSelectorMock = jest
    .spyOn(reactRedux, 'useSelector')
    .mockImplementation((props) => {
      if (props === generalSelector.getPersistState)
        return { rehydrated: false };
      return false;
    });
  jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(dispatch);

  const createChannelSpy = jest.spyOn(pushNotification, 'createChannel');
  jest.spyOn(pushNotification, 'getAllScheduledLocalNotifications');

  test('ao inicializar deve criar um channel da notificação', () => {
    const { result } = renderHook(useNavigator);
    expect(createChannelSpy).toHaveBeenCalledWith(
      result.current.setChannelCreated,
    );
  });

  test('deve atualizar o rehydrate e o isAuthenticated', async () => {
    const { result, rerender } = renderHook(useNavigator);
    expect(result.current.isRehydrated).toBe(false);
    expect(result.current.isAuthenticated).toBe(false);

    useSelectorMock.mockImplementation((props) => {
      if (props === generalSelector.getPersistState)
        return { rehydrated: true };
      if (props === authSelectors.isLogged) return true;
    });

    rerender();
    expect(result.current.isRehydrated).toBe(true);
    expect(result.current.isAuthenticated).toBe(true);
  });
});
