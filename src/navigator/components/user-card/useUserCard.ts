import { useSelector } from 'react-redux';
import { authSelectors } from '@store/auth';
import { useCallback } from 'react';
import { Props } from '.';
import { Routes } from '@routes';

const useUserCard = (props: Props) => {
  const authReducer = useSelector(authSelectors.getState);

  const handleLoginPress = useCallback(() => {
    props.navigation.navigate(Routes.UnauthenticatedNavigator, {
      isLoggedIn: authReducer.isLoggedIn,
    });
  }, []);

  return {
    handleLoginPress,
    isAnonymously: authReducer.isAnonymously,
    userName: authReducer.currentUser?.displayName,
    photoURL: authReducer.currentUser?.photoURL,
  };
};

export default useUserCard;
