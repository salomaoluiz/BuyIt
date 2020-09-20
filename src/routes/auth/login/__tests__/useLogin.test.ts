import * as navigation from '@react-navigation/native';
import { authActions } from '@store/auth';
import { act, renderHook } from '@testing-library/react-hooks';
import * as reactRedux from 'react-redux';
import { useNavigationMocks } from 'src/__tests__/navigation-mocks';
import useLogin from '../useLogin';
import useHeader from '@navigator/components/header/useHeader';
import { StatusBar } from 'react-native';

jest.mock('@react-navigation/native');
jest.mock('@navigator/components/header/useHeader', () => jest.fn());

describe('Login - useLogin', () => {
  jest.spyOn(navigation, 'useNavigation').mockReturnValue(useNavigationMocks);
  const dispatch = jest.fn();
  jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(dispatch);
  const setHiddenSpy = jest.spyOn(StatusBar, 'setHidden');
  jest.spyOn(reactRedux, 'useSelector').mockImplementation(() => {
    return false;
  });

  test('ao inicializar deve ocultar a statusBar, e o header', () => {
    const initialProps = {
      formParams: {
        email: 'a@a.com',
        password: '123456',
      },
      checkForm: jest.fn().mockResolvedValue(true),
    };

    renderHook(useLogin, { initialProps });

    expect(useHeader).toHaveBeenCalledWith({
      showHeader: false,
      showBackButton: true,
    });

    expect(setHiddenSpy).toHaveBeenCalledWith(true);
  });

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

    expect(dispatch).toHaveBeenCalledWith(authActions.loginAnonymously());
  });

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
      authActions.loginEmailPasswordAsync(
        initialProps.formParams.email,
        initialProps.formParams.password,
      ),
    );
  });
});
