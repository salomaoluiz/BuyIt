import { RouteProp, useRoute } from '@react-navigation/native';
import { useCallback, useState } from 'react';

import useFormError from '@errors/useFormError';
import { UnauthenticatedParamsList } from '@navigator/unauthenticated';

type RouteProps = RouteProp<UnauthenticatedParamsList, 'RegisterUser'>;

const useForm = () => {
  const route = useRoute<RouteProps>();

  const editEmail = route.params?.email || '';

  const [email, setEmail] = useState(editEmail);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  const formParams = { email, password, confirmPassword, name };

  const { handleErrorMessage, validateError } = useFormError({
    formParams,
    formName: 'register',
  });

  const checkForm = useCallback(() => validateError(), [formParams]);

  return {
    formParams,
    setEmail,
    setPassword,
    setConfirmPassword,
    setName,
    handleErrorMessage,
    checkForm,
  };
};

export default useForm;
