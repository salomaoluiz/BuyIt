import { useState, useCallback } from 'react';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';

import { UnauthenticatedParamsList } from '@navigator/unauthenticated';
import { StackNavigationProp } from '@react-navigation/stack';
import * as strings from '@locales/register';
import { colors } from '@styles';
import useFormError from 'src/errors/useFormError';
import { useDispatch, useSelector } from 'react-redux';
import actions from '@store/auth/actions';
import { authSelectors } from '@store/auth';

type Params = UnauthenticatedParamsList;
type RouteName = 'RegisterUser';
type StackNavigation = StackNavigationProp<Params, RouteName>;
type StackRoute = RouteProp<Params, RouteName>;

const useRegister = () => {
  const route = useRoute<StackRoute>();
  const navigation = useNavigation<StackNavigation>();
  navigation.setOptions({
    title: strings.register,
    headerStyle: {
      backgroundColor: colors.list.brandPrimaryDark,
    },
  });

  const editEmail = route.params?.email || '';
  const { isLoading } = useSelector(authSelectors.getState);

  const [email, setEmail] = useState(editEmail);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const formList = { email, password, confirmPassword, name };

  const dispatch = useDispatch();
  const { handleErrorMessage, validateError, clearErrors } = useFormError(
    formList,
    'register',
  );

  const handleRegisterPress = useCallback(async () => {
    const canDoRegister = await validateError();

    if (canDoRegister) {
      clearErrors();
      dispatch(actions.registerEmailPasswordAsync(formList));
      return;
    }
  }, [formList]);

  return {
    email,
    password,
    confirmPassword,
    name,
    setEmail,
    setPassword,
    setConfirmPassword,
    setName,
    handleRegisterPress,
    handleErrorMessage,
    isLoading,
  };
};

export default useRegister;
