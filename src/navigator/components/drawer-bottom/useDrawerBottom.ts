import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from '@store/auth';

const useDrawerBottom = () => {
  const dispatch = useDispatch();

  const onLogoutPress = useCallback(async () => {
    dispatch(authActions.logoutAsync());
  }, []);

  return { onLogoutPress };
};

export default useDrawerBottom;
