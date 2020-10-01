import * as reactRedux from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';
import { useErrorMessage } from '@utils/handleErrors';
import { notificationActions } from '@store/notification';
describe('Testando handleErrors', () => {
  const dispatch = jest.fn();
  jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(dispatch);

  test('deve chamar o sendNotification passando as informações de erro', () => {
    renderHook(() => useErrorMessage('body'));

    expect(dispatch).toHaveBeenLastCalledWith(
      notificationActions.sendNotificationAsync({
        body: 'body',
        icon: 'alert',
      }),
    );
  });
});
