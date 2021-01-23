import { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { translate } from '@locales';
import { notificationSelector, notificationActions } from '@store/notification';
import { BannerButton } from '@store/notification/types';

const useBanner = () => {
  const notificationState = useSelector(notificationSelector.getBanner);
  const [isVisible, setIsVisible] = useState(false);
  const [body, setBody] = useState<string | undefined>(undefined);
  const [icon, setIcon] = useState<string | undefined>(undefined);

  const [bannerActions] = useState<BannerButton[]>([]);

  const dispatch = useDispatch();

  const _handleDismiss = useCallback(() => {
    dispatch(notificationActions.dismissBanner());
  }, []);

  const setNotificationData = useCallback(() => {
    setIsVisible(notificationState.isVisible!!);
    setBody(notificationState.body);
    setIcon(notificationState.icon);
  }, [notificationState.isVisible!!]);

  useEffect(() => {
    setNotificationData();
  }, [notificationState.isVisible!!]);

  useEffect(() => {
    const { firstAction, secondAction } = notificationState;

    if (firstAction) {
      bannerActions.push(firstAction);
    } else {
      bannerActions.push({
        onPress: _handleDismiss,
        label: translate('general.dismiss').toLocaleUpperCase(),
      });
    }

    if (secondAction) bannerActions.push(secondAction);
  }, [notificationState.firstAction, notificationState.secondAction]);

  return {
    _handleDismiss,
    isVisible,
    body,
    icon,
    bannerActions,
  };
};

export default useBanner;
