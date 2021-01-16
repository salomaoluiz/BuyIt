import * as navigation from '@react-navigation/native';
import { act, renderHook } from '@testing-library/react-hooks';
import * as reactRedux from 'react-redux';

import { Routes } from '@routes';
import { authActions } from '@store/auth';
import { useNavigationMocks } from 'src/__tests__/navigation-mocks';

import useLogin from '../useLogin';

jest.mock('@react-navigation/native');

describe('Login - useLogin', () => {
  jest.spyOn(navigation, 'useNavigation').mockReturnValue(useNavigationMocks);
  const dispatch = jest.fn();
  jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(dispatch);
  jest.spyOn(reactRedux, 'useSelector').mockImplementation(() => {
    return false;
  });

  // when handleLoginAnonymously are called, should dispatch a action to Anonymous login
  test('se chamado handleLoginAnonymously, deve disparar a action de login anonimo', () => {
    const initialProps = {
      formParams: {
        email: 'a@a.com',
        password: '123456',
      },
      checkForm: jest.fn().mockResolvedValue(true),
    };

    const { result } = renderHook(useLogin, { initialProps });

    act(() => {
      result.current.handleLoginAnonymously();
    });

    expect(dispatch).toHaveBeenCalledWith(authActions.requestLoginAnonymously());
  });

  // when handleLoginEmailPassword is called and the form is correctly, should dispatch a action to login with email and password
  test('se chamado handleLoginEmailPassword e o form estiver correto, deve disparar a action do login com email e senha', async () => {
    const initialProps = {
      formParams: {
        email: 'a@a.com',
        password: '123456',
      },
      checkForm: jest.fn().mockResolvedValue(true),
    };

    const { result } = renderHook(useLogin, { initialProps });

    await act(async () => {
      await result.current.handleLoginEmailPassword();
    });

    expect(initialProps.checkForm).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(
      authActions.requestLoginEmailPassword(
        initialProps.formParams.email,
        initialProps.formParams.password,
      ),
    );
  });

  // when handleRegisterUser is called, should navigate to the Register screen passing the email as props
  test('se chamado handleRegisterUser deve navegar para a tela de Registro passando o email como props', async () => {
    const initialProps = {
      formParams: {
        email: 'a@a.com',
        password: '',
      },
      checkForm: jest.fn().mockResolvedValue(true),
    };

    const { result } = renderHook(useLogin, { initialProps });

    await act(async () => {
      await result.current.handleRegisterUser();
    });

    expect(
      useNavigationMocks.navigate,
    ).toHaveBeenCalledWith(Routes.RegisterUser, {
      email: initialProps.formParams.email,
    });
  });
});
