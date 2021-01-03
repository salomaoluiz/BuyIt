import { useCallback, useState } from 'react';

import useFormError from '@errors/useFormError';

const useForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const formParams = { email, password };

  const { handleErrorMessage, validateError } = useFormError({
    formParams,
    formName: 'login',
  });

  const checkForm = useCallback(async () => {
    const isValid = await validateError();
    return isValid;
  }, [formParams]);

  return {
    formParams,
    handleErrorMessage,
    setEmail,
    setPassword,
    checkForm,
  };
};

export default useForm;
