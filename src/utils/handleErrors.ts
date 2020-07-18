import { useDispatch } from 'react-redux';
import { notificationActions } from '@store/notification';

const useErrorMessage = (title: string, body: string) => {
  const dispatch = useDispatch();

  dispatch(
    notificationActions.sendNotificationAsync({ title, body, icon: 'alert' }),
  );
};

export { useErrorMessage };
