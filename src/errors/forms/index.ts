import productItem from './product-item';
import productList from './product-list';
import { ProductItemForm, ProductListForm } from '@store/product-list/types';
import login from './login';
import register from './register';
import { ValidationError } from 'yup';
import { AuthLoginForm, AuthRegisterForm } from '@store/auth/types';

const validationList = {
  productItem,
  login,
  register,
  productList,
};

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
  validate: FormName,
): Promise<ErrorInterface | undefined> => {
  const validationResult = await validationList[validate](value);

  if (validationResult === true) return;

  const errorsList = formatErrorList(validationResult);

  return { formTested: validate, errors: errorsList };
};

export default validateForm;
