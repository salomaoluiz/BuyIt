import { useDispatch } from 'react-redux';
import { notificationActions } from '@store/notification';

const useErrorMessage = (body: string) => {
  const dispatch = useDispatch();

  dispatch(
    notificationActions.sendNotificationAsync({ body, icon: 'alert' }),
  );
};

export { useErrorMessage };
