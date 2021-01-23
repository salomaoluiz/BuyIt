import { act, renderHook } from '@testing-library/react-hooks';
import * as reactRedux from 'react-redux';

import { translate } from '@locales';
import { notificationActions, notificationSelector } from '@store/notification';

import useBanner from '../useBanner';

describe('Testando o useBanner', () => {
  const dispatch = jest.fn();

  const initialState = {
    body: undefined,
    icon: undefined,
    isVisible: false,
  };

  jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(dispatch);
  const useSelectorMock = jest
    .spyOn(reactRedux, 'useSelector')
    .mockImplementation((func) => {
      if (func === notificationSelector.getBanner) return initialState;
    });

  jest.useFakeTimers();
  test('a notificação nao pode aparecer se estiver com os valores default ', () => {
    const { result } = renderHook(useBanner);

    expect(result.current.body).toEqual(undefined);
    expect(result.current.icon).toEqual(undefined);
    expect(result.current.isVisible).toEqual(false);
  });

  test('deve apresentar a notificação se houver a alteração do initialState', () => {
    useSelectorMock.mockReturnValue({
      title: 'title',
      body: 'body',
      icon: 'alert',
      isVisible: true,
    });
    const { result } = renderHook(useBanner);

    expect(result.current.body).toEqual('body');
    expect(result.current.icon).toEqual('alert');
    expect(result.current.isVisible).toEqual(true);
    expect(result.current.bannerActions).toEqual([
      {
        onPress: result.current._handleDismiss,
        label: translate('general.dismiss').toLocaleUpperCase(),
      },
    ]);
  });

  test('deve apresentar a notificação com duas actions customizadas', () => {
    const mock = {
      title: 'title',
      body: 'body',
      icon: 'alert',
      isVisible: true,
      firstAction: {
        onPress: jest.fn(),
        label: 'first_label',
      },
      secondAction: {
        onPress: jest.fn(),
        label: 'second_label',
      },
    };

    useSelectorMock.mockReturnValue(mock);

    const { result } = renderHook(useBanner);

    expect(result.current.body).toEqual('body');
    expect(result.current.icon).toEqual('alert');
    expect(result.current.isVisible).toEqual(true);
    expect(result.current.bannerActions).toEqual([
      mock.firstAction,
      mock.secondAction,
    ]);
  });

  test('ao chamar o handleDismiss deve disparar a action para fechar a notificacao', () => {
    useSelectorMock.mockReturnValue({
      title: 'title',
      body: 'body',
      icon: 'alert',
      isVisible: true,
    });
    const { result } = renderHook(useBanner);

    act(() => {
      result.current._handleDismiss();
    });

    expect(dispatch).toHaveBeenCalledWith(notificationActions.dismissBanner());
  });
});
