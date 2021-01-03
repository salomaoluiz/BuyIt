import {
  CommonActions,
  NavigationContainerRef,
} from '@react-navigation/native';

import { useNavigationMocks } from 'src/__tests__/navigation-mocks';

import navigationService, { setNavigator } from '../navigationService';

jest.mock('@react-navigation/native');

describe('Navigation Service', () => {
  const goBack = jest
    .spyOn(CommonActions, 'goBack')
    .mockReturnValue({ type: 'GO_BACK' });
  const navigate = jest
    .spyOn(CommonActions, 'navigate')
    .mockReturnValue({ type: 'NAVIGATE', payload: { name: 'route' } });
  const reset = jest.spyOn(CommonActions, 'reset').mockReturnValue({
    type: 'RESET',
    payload: { routes: [{ name: 'route' }] },
  });

  const mockNavigator: { navigator: NavigationContainerRef } = {
    navigator: {
      ...useNavigationMocks,
      dispatch: jest.fn(),
      emit: jest.fn(),
      getCurrentOptions: jest.fn(),
      getCurrentRoute: jest.fn(),
      getRootState: jest.fn(),
      resetRoot: jest.fn(),
    },
  };

  describe('Caso nao tenha setado nenhum navigator', () => {
    beforeEach(() => {
      // @ts-ignore
      setNavigator(undefined);
    });

    test('nao deve conseguir executar o navigate', () => {
      navigationService.navigate('route', { value: 'value' });

      expect(navigate).not.toHaveBeenCalled();

      expect(mockNavigator.navigator.dispatch).not.toHaveBeenCalled();
    });

    test('nao deve conseguir chamar a action goBack e realizar o dispatch dela', () => {
      navigationService.goBack();

      expect(goBack).not.toHaveBeenCalled();

      expect(mockNavigator.navigator.dispatch).not.toHaveBeenCalledWith({
        type: 'GO_BACK',
      });
    });

    test('nao deve conseguir chamar a action reset e realizar o dispatch dela', () => {
      const props = { routes: [{ name: 'route' }] };
      navigationService.reset(props);

      expect(reset).not.toHaveBeenCalledWith(props);

      expect(mockNavigator.navigator.dispatch).not.toHaveBeenCalledWith({
        type: 'RESET',
        payload: { routes: [{ name: 'route' }] },
      });
    });
  });

  describe('Caso possua o navigator', () => {
    beforeEach(() => {
      setNavigator(mockNavigator.navigator);
    });

    test('deve chamar a action navigate e realizar o dispatch dela', () => {
      navigationService.navigate('route', { value: 'value' });

      expect(navigate).toHaveBeenCalledWith({
        name: 'route',
        params: { value: 'value' },
      });

      expect(mockNavigator.navigator.dispatch).toHaveBeenCalledWith({
        type: 'NAVIGATE',
        payload: { name: 'route' },
      });
    });

    test('deve chamar a action goBack e realizar o dispatch dela', () => {
      navigationService.goBack();

      expect(goBack).toHaveBeenCalled();

      expect(mockNavigator.navigator.dispatch).toHaveBeenCalledWith({
        type: 'GO_BACK',
      });
    });

    test('deve chamar a action reset e realizar o dispatch dela', () => {
      const props = { routes: [{ name: 'route' }] };
      navigationService.reset(props);

      expect(reset).toHaveBeenCalledWith(props);

      expect(mockNavigator.navigator.dispatch).toHaveBeenCalledWith({
        type: 'RESET',
        payload: { routes: [{ name: 'route' }] },
      });
    });
  });
});
