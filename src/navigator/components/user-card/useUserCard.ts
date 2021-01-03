import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { Routes } from '@routes';
import { authSelectors } from '@store/auth';

import { Props } from './';

const useUserCard = (props: Props) => {
  const authReducer = useSelector(authSelectors.getState);

  const handleLoginPress = useCallback(() => {
    props.navigation.navigate(Routes.UnauthenticatedNavigator);
  }, []);

  return {
    handleLoginPress,
    isAnonymously: authReducer.isAnonymously,
    userName: authReducer.currentUser?.displayName,
    photoURL: authReducer.currentUser?.photoURL,
  };
};

export default useUserCard;
