import { renderHook } from '@testing-library/react-hooks';
import * as reactRedux from 'react-redux';

import { notificationActions } from '@store/notification';
import { useErrorMessage } from '@utils/handleErrors';

describe('Testando handleErrors', () => {
  const dispatch = jest.fn();
  jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(dispatch);

  test('deve chamar o showBannerAsync passando as informações de erro', () => {
    renderHook(() => useErrorMessage('body'));

    expect(dispatch).toHaveBeenLastCalledWith(
      notificationActions.showBannerAsync({
        body: 'body',
        icon: 'alert',
      }),
    );
  });
});
