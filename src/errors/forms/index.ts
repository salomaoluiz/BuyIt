import { ValidationError } from 'yup';

import { AuthLoginForm, AuthRegisterForm } from '@store/auth/types';
import { ProductItemForm, ProductListForm } from '@store/product-list/types';

import testSchema from './testSchema';

export type FormName = 'productItem' | 'login' | 'register' | 'productList';
export type FormValues =
  | ProductItemForm
  | AuthLoginForm
  | AuthRegisterForm
  | ProductListForm;

type ErrorList = { errorItem: string; errorMessage: string }[];

export interface ErrorInterface {
  formTested: FormName;
  errors: ErrorList;
}

const formatErrorList = (err: ValidationError[]) => {
  const errorList: ErrorList = [];
  err.forEach((item) => {
    const error = {
      errorItem: item.path,
      errorMessage: item.errors[0],
    };

    errorList.push(error);
  });

  return errorList;
};

const validateForm = async (
  value: Partial<FormValues>,
  formName: FormName,
): Promise<ErrorInterface | undefined> => {
  const validationResult = await testSchema(formName, value);

  if (validationResult === true) return;

  const errorsList = formatErrorList(validationResult);

  return { formTested: formName, errors: errorsList };
};

export default validateForm;
