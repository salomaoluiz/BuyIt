import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { pushNotification } from '@lib/push-notification';
import { authSelectors } from '@store/auth';
import { generalSelector } from '@store/general';
import { notificationActions } from '@store/notification';

const useNavigator = () => {
  const isLogged = useSelector(authSelectors.isLogged);
  const isAnonymously = useSelector(authSelectors.isAnonymously);
  const { rehydrated } = useSelector(generalSelector.getPersistState);

  const [isRehydrated, setIsRehydrated] = useState(rehydrated);
  const [channedCreated, setChannelCreated] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    pushNotification.createChannel(setChannelCreated);
    pushNotification.getAllScheduledLocalNotifications((notifications) => {
      dispatch(
        notificationActions.syncScheduleLocalNotificationAsync(notifications),
      );
    });
  }, []);

  useEffect(() => {
    if (rehydrated) {
      setIsRehydrated(true);
    }
  }, [isLogged, rehydrated]);

  return {
    isAuthenticated: isLogged || isAnonymously,
    isRehydrated,
    channedCreated,
    setChannelCreated,
  };
};

export default useNavigator;
