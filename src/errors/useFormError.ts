import { useState, useCallback } from 'react';

import validateForm, { ErrorInterface, FormName, FormValues } from './forms';

const useFormError = (props: {
  formParams: FormValues;
  formName: FormName;
}) => {
  const { formParams, formName } = props;
  const [errorItems, setErrorItems] = useState<ErrorInterface>();

  const validateError = useCallback(async () => {
    const errors = await validateForm(formParams, formName);

    if (errors) {
      setErrorItems(errors);
      return false;
    }
    return true;
  }, [formParams]);

  const handleErrorMessage = useCallback(
    (item: string, infoHelper?: string) => {
      if (errorItems) {
        const error = errorItems.errors.find((err) => err.errorItem === item);

        if (error) return { error: true, helperText: error?.errorMessage };
      }

      return { helperText: infoHelper };
    },
    [errorItems],
  );

  const clearErrors = useCallback(() => {
    setErrorItems(undefined);
  }, []);

  return { handleErrorMessage, clearErrors, validateError, errorItems };
};

export default useFormError;
