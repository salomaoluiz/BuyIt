import { act, renderHook } from '@testing-library/react-hooks';
import * as reactRedux from 'react-redux';

import { Routes } from '@routes';
import { useNavigationMocks } from 'src/__tests__/navigation-mocks';

import useUserCard from '../useUserCard';

describe('User Card - useUserCard', () => {
  jest.spyOn(reactRedux, 'useSelector').mockReturnValue({
    isAnonymously: false,
    currentUser: { displayName: 'aaaa', photoURL: undefined },
  });
  const navigate = jest.fn();

  test('ao inicializar deve retornar se é anonimo, o nome do usuario e a URL da photo dele', () => {
    const initialProps = {
      navigation: {
        ...useNavigationMocks,
        navigate,
        emit: jest.fn(),
      },
    };
    const { result } = renderHook(useUserCard, { initialProps });

    expect(result.current.isAnonymously).toEqual(false);
    expect(result.current.userName).toEqual('aaaa');
    expect(result.current.photoURL).toEqual(undefined);
  });

  test('ao pressionar o botao de login, deve navegar para a tela de nao autenticado', () => {
    const initialProps = {
      navigation: {
        ...useNavigationMocks,
        navigate,
        emit: jest.fn(),
      },
    };
    const { result } = renderHook(useUserCard, { initialProps });

    act(() => {
      result.current.handleLoginPress();
    });

    expect(navigate).toHaveBeenCalledWith(Routes.UnauthenticatedNavigator);
  });
});
