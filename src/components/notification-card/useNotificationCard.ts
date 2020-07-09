import { useSelector, useDispatch } from 'react-redux';
import { notificationSelector, notificationActions } from '@store/notification';
import { useEffect, useState, useCallback, useRef } from 'react';
import { Animated } from 'react-native';
import { animation } from '@styles';

const useNotificationCard = () => {
  const notificationState = useSelector(notificationSelector.getState);
  const [isVisible, setIsVisible] = useState(false);
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [body, setBody] = useState<string | undefined>(undefined);
  const [icon, setIcon] = useState<string | undefined>(undefined);
  const animationPosition = useRef(new Animated.Value(0)).current;

  const dispatch = useDispatch();

  const handlePressNotification = useCallback(() => {
    dispatch(notificationActions.dismissNotification());
  }, []);

  const setNotificationData = useCallback(() => {
    setIsVisible(notificationState.isVisible);
    setTitle(notificationState.title);
    setBody(notificationState.body);
    setIcon(notificationState.icon);
  }, [notificationState.isVisible]);

  const animationStart = useCallback(
    (toValue: number) => {
      Animated.spring(animationPosition, {
        toValue: toValue,
        useNativeDriver: true,
        speed: animation.speed.slow,
      }).start(() => {
        if (!isVisible) {
          setNotificationData();
        }
      });
    },
    [notificationState.isVisible],
  );

  useEffect(() => {
    if (notificationState.isVisible) {
      setNotificationData();
      animationStart(1);
      return;
    }
    animationStart(0);
    return;
  }, [notificationState.isVisible]);

  return {
    isVisible,
    body,
    title,
    icon,
    animationPosition,
    handlePressNotification,
  };
};

export default useNotificationCard;
