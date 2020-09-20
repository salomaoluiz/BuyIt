import { useCallback } from 'react';

import * as strings from '@locales/register';
import { useDispatch, useSelector } from 'react-redux';
import actions from '@store/auth/actions';
import { authSelectors } from '@store/auth';
import { AuthRegisterForm } from '@store/auth/types';
import useHeader from '@navigator/components/header/useHeader';

interface Props {
  formParams: AuthRegisterForm;
  checkForm: () => Promise<boolean>;
}

const useRegister = (props: Props) => {
  const { formParams, checkForm } = props;
  const isLoading = useSelector(authSelectors.isLoading);

  const dispatch = useDispatch();

  const handleRegisterPress = useCallback(async () => {
    const canDoRegister = await checkForm();

    if (canDoRegister) {
      dispatch(actions.registerEmailPasswordAsync(formParams));
    }
  }, [formParams]);

  useHeader({
    title: strings.register,
    showHeader: true,
  });
  return {
    handleRegisterPress,
    isLoading,
  };
};

export default useRegister;
