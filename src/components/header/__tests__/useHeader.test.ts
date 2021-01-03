import * as navigation from '@react-navigation/native';
import { act, renderHook } from '@testing-library/react-hooks';
import { StatusBar } from 'react-native';
import * as paper from 'react-native-paper';

import { useNavigationMocks } from 'src/__tests__/navigation-mocks';
import { useThemeMocks } from 'src/__tests__/paper-mocks';

import useHeader from '../useHeader';

jest.mock('@react-navigation/native');
jest.mock('react-native-paper');

describe('testando useHeader', () => {
  const spySetHidden = jest.spyOn(StatusBar, 'setHidden');

  jest.spyOn(navigation, 'useNavigation').mockReturnValue(useNavigationMocks);
  jest.spyOn(paper, 'useTheme').mockReturnValue(useThemeMocks);

  test('ao inicializar, deve retornar o theme, a altura default da statusbar e as funções de back e openMenu', () => {
    const initialProps = {
      hiddenStatusBar: false,
    };
    const { result } = renderHook(useHeader, { initialProps });

    expect(result.current.onBackButtonPress).toBeTruthy();
    expect(result.current.onShowDrawerPress).toBeTruthy();
    expect(result.current.theme).toEqual(useThemeMocks);
    expect(result.current.statusBarHeight).toEqual(StatusBar.currentHeight);
  });

  test('ao atualizar a altura do statusbar, deve setar no StatusBar a nova altura', () => {
    const initialProps = {
      hiddenStatusBar: false,
    };
    const { rerender } = renderHook(useHeader, { initialProps });

    expect(spySetHidden).toHaveBeenCalledWith(false);

    rerender({ hiddenStatusBar: true });

    expect(spySetHidden).toHaveBeenCalledWith(true);
  });

  test('ao pressionar o botão de retornar, deve chamar a função goBack', () => {
    const initialProps = {
      hiddenStatusBar: false,
    };
    const { result } = renderHook(useHeader, { initialProps });

    act(() => {
      result.current.onBackButtonPress();
    });

    expect(useNavigationMocks.goBack).toHaveBeenCalled();
  });

  test('ao pressionar o botão de menu, deve chamar a função openDrawer', () => {
    const initialProps = {
      hiddenStatusBar: false,
    };
    const { result } = renderHook(useHeader, { initialProps });

    act(() => {
      result.current.onShowDrawerPress();
    });

    expect(useNavigationMocks.openDrawer).toHaveBeenCalled();
  });
});
