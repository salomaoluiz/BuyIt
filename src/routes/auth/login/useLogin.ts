import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { UnauthenticatedParamsList } from '@navigator/unauthenticated';
import { Routes } from '@routes';
import { authActions, authSelectors } from '@store/auth';
import { AuthLoginForm } from '@store/auth/types';

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
    dispatch(authActions.requestLoginAnonymously());
  }, []);

  const handleLoginEmailPassword = useCallback(async () => {
    const canDoLogin = await checkForm();
    if (canDoLogin) {
      dispatch(authActions.requestLoginEmailPassword(email, password));
    }
  }, [formParams]);

  const handleRegisterUser = useCallback(() => {
    navigation.navigate(Routes.RegisterUser, { email });
  }, [email]);

  return {
    isLoading,
    isAnonymously,
    handleLoginAnonymously,
    handleLoginEmailPassword,
    handleRegisterUser,
  };
};

export default useLogin;
