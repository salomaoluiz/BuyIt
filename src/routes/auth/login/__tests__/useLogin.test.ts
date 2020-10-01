import * as navigation from '@react-navigation/native';
import { authActions } from '@store/auth';
import { act, renderHook } from '@testing-library/react-hooks';
import * as reactRedux from 'react-redux';
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
