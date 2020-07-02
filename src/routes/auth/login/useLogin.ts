import { useCallback, useState, useEffect } from 'react';
import { authActions, authSelectors } from '@store/auth';
import { useDispatch, useSelector } from 'react-redux';

import { StatusBar } from 'react-native';
import { Props } from '.';
import useFormError from 'src/errors/useFormError';
import { Routes } from '@routes';

const useLogin = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const formList = { email, password };
  const { handleErrorMessage, validateError } = useFormError(formList, 'login');

  const { isLoading, isLoggedIn, isAnonymously } = useSelector(
    authSelectors.getState,
  );
  const isLoggedAnonymously = isLoggedIn && isAnonymously;

  const dispatch = useDispatch();

  const handleLoginAnonymously = useCallback(() => {
    dispatch(authActions.loginAnonymously());
  }, []);

  const handleLoginEmailPassword = useCallback(async () => {
    const canDoLogin = await validateError();
    if (canDoLogin) {
      dispatch(authActions.loginEmailPasswordAsync(email, password));
    }

  }, [email, password]);

  const handleRegisterUser = useCallback(() => {
    navigation.navigate(Routes.RegisterUser, { email });
  }, [email]);

  useEffect(() => {
    StatusBar.setHidden(true);
  }, []);

  return {
    handleLoginAnonymously,
    handleLoginEmailPassword,
    isLoading,
    isLoggedAnonymously,
    email,
    setEmail,
    password,
    setPassword,
    handleErrorMessage,
    handleRegisterUser,
  };
};

export default useLogin;
