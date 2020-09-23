import * as reactRedux from 'react-redux';
import { NotificationState } from '@store/notification/types';
import { renderHook, act } from '@testing-library/react-hooks';
import useNotificationCard from '../useNotificationCard';
import { Animated } from 'react-native';
import { animation } from '@styles';
import { notificationActions } from '@store/notification';

describe('Testando o useNotificationCard', () => {
  const dispatch = jest.fn();

  const initialState: NotificationState = {
    title: undefined,
    body: undefined,
    icon: undefined,
    isVisible: false,
  };

  jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(dispatch);
  const useSelectorMock = jest
    .spyOn(reactRedux, 'useSelector')
    .mockReturnValue(initialState);
  const mockStartAnimate = jest.fn();
  const animatedSpring = jest.spyOn(Animated, 'spring').mockReturnValue({
    start: mockStartAnimate,
    stop: jest.fn(),
    reset: jest.fn(),
  });

  jest.useFakeTimers();
  test('a notificação nao pode aparecer se estiver com os valores default ', () => {
    const { result } = renderHook(useNotificationCard);

    expect(result.current.body).toEqual(undefined);
    expect(result.current.title).toEqual(undefined);
    expect(result.current.icon).toEqual(undefined);
    expect(result.current.isVisible).toEqual(false);

    expect(animatedSpring).toHaveBeenCalledWith(
      result.current.animationPosition,
      {
        toValue: 0,
        useNativeDriver: true,
        speed: animation.speed.slow,
      },
    );

    expect(mockStartAnimate).toHaveBeenCalled();
  });

  test('deve apresentar a notificação se houver a alteração do initialState', () => {
    useSelectorMock.mockReturnValue({
      title: 'title',
      body: 'body',
      icon: 'alert',
      isVisible: true,
    });
    const { result } = renderHook(useNotificationCard);

    expect(result.current.body).toEqual('body');
    expect(result.current.title).toEqual('title');
    expect(result.current.icon).toEqual('alert');
    expect(result.current.isVisible).toEqual(true);

    expect(animatedSpring).toHaveBeenLastCalledWith(expect.anything(), {
      toValue: 1,
      useNativeDriver: true,
      speed: animation.speed.slow,
    });
  });

  test('ao clicar na notificação deve fazer o dismiss', () => {
    const { result } = renderHook(useNotificationCard);

    act(() => {
      result.current.handlePressNotification();
    });

    expect(dispatch).toHaveBeenCalledWith(
      notificationActions.dismissNotification(),
    );
  });
});
