import useHeader from '@navigator/components/header/useHeader';
import { act, renderHook } from '@testing-library/react-hooks';
import * as strings from '@locales/register';
import useRegister from '../useRegister';
import * as reactRedux from 'react-redux';
import { authActions } from '@store/auth';

jest.mock('@navigator/components/header/useHeader', () => jest.fn());
describe('Register - useRegister', () => {
  const dispatch = jest.fn();
  jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(dispatch);
  jest.spyOn(reactRedux, 'useSelector').mockReturnValue(false);
  
  const initialProps = {
    formParams: {
      name: 'aaa',
      email: 'a@a.com',
      password: '123456',
      confirmPassword: '123456',
    },
    checkForm: jest.fn().mockResolvedValue(true),
  };

  test('ao inicializar deve mostrar o header e setar o titulo', () => {
    renderHook(useRegister, { initialProps });

    expect(useHeader).toHaveBeenCalledWith({
      title: strings.register,
      showHeader: true,
    });
  });

  test('ao pressionar o botao de registro com o formulario válido deve disparar a action de registro', async () => {
    const { result } = renderHook(useRegister, { initialProps });

    await act(async () => {
      await result.current.handleRegisterPress();
    });

    expect(dispatch).toHaveBeenCalledWith(
      authActions.registerEmailPasswordAsync(initialProps.formParams),
    );
  });
});
