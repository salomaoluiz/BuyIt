import { useCallback, useEffect } from 'react';
import { authActions, authSelectors } from '@store/auth';
import { useDispatch, useSelector } from 'react-redux';

import { StatusBar } from 'react-native';

import { Routes } from '@routes';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { UnauthenticatedParamsList } from '@navigator/unauthenticated';
import { AuthLoginForm } from '@store/auth/types';
import useHeader from '@navigator/components/header/useHeader';

type NavProps = NavigationProp<UnauthenticatedParamsList, 'Login'>;

interface Props {
  formParams: AuthLoginForm;
  checkForm: () => Promise<boolean>;
}
const useLogin = (props: Props) => {
  const { checkForm, formParams } = props;
  const { email, password } = formParams;

  const navigation = useNavigation<NavProps>();
  const isLoading = useSelector(authSelectors.isLoading);
  const isAnonymously = useSelector(authSelectors.isAnonymously);
  const dispatch = useDispatch();

  const handleLoginAnonymously = useCallback(() => {
    dispatch(authActions.loginAnonymously());
  }, []);

  const handleLoginEmailPassword = useCallback(async () => {
    const canDoLogin = await checkForm();
    if (canDoLogin) {
      dispatch(authActions.loginEmailPasswordAsync(email, password));
    }
  }, [formParams]);

  const handleRegisterUser = useCallback(() => {
    navigation.navigate(Routes.RegisterUser, { email });
  }, [email]);

  useHeader({ showHeader: !!isAnonymously, showBackButton: true });

  useEffect(() => {
    StatusBar.setHidden(true);
  }, []);

  return {
    isLoading,
    isAnonymously,
    handleLoginAnonymously,
    handleLoginEmailPassword,
    handleRegisterUser,
  };
};

export default useLogin;
