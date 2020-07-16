import productList from './product-list';
import { ProductItem } from '@store/product-list/types';
import { ValidationError } from 'yup';

const validationList = {
  productList,
};

type Forms = 'productList';
type Values = ProductItem;
type ErrorList = { errorItem: string; errorMessage: string }[];

export interface ErrorInterface {
  formTested: Forms;
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
  value: Partial<Values>,
  validate: Forms,
): Promise<ErrorInterface | undefined> => {
  const validationResult = await validationList[validate](value);

  if (validationResult === true) return;

  const errorsList = formatErrorList(validationResult);

  return { formTested: validate, errors: errorsList };
};

export { validateForm };
