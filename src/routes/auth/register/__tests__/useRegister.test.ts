import { act, renderHook } from '@testing-library/react-hooks';
import * as reactRedux from 'react-redux';

import { authActions } from '@store/auth';

import useRegister from '../useRegister';

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

  // when you press the register button with a valid form, should dispatch the action to register
  test('ao pressionar o botao de registro com o formulario válido deve disparar a action de registro', async () => {
    const { result } = renderHook(useRegister, { initialProps });

    await act(async () => {
      await result.current.handleRegisterPress();
    });

    expect(dispatch).toHaveBeenCalledWith(
      authActions.requestRegisterEmailPassword(initialProps.formParams),
    );
  });
});
