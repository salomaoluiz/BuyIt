import { act, renderHook } from '@testing-library/react-hooks';
import * as reactRedux from 'react-redux';

import { authActions } from '@store/auth';

import useDrawerBottom from '../useDrawerBottom';

describe('Drawer Bottom - useDrawerBottom', () => {
  const dispatch = jest.fn();
  jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(dispatch);

  test('ao pressionar o botão de logout deve disparar a action de logout', () => {
    const { result } = renderHook(useDrawerBottom);

    act(() => {
      result.current.onLogoutPress();
    });

    expect(dispatch).toHaveBeenCalledWith(authActions.requestLogout());
  });
});
