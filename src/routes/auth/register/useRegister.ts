import { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import actions from '@store/auth/actions';
import { authSelectors } from '@store/auth';
import { AuthRegisterForm } from '@store/auth/types';

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

  return {
    handleRegisterPress,
    isLoading,
  };
};

export default useRegister;
