import strings from '@locales/general-errors';
import { ValidationError } from 'yup';

const generateError = (errorText: string | string[], path: string) => {
  return new ValidationError(errorText, '', path);
};

const nameRequired = generateError(
  strings.generalErrors.thisValueIsRequired,
  'name',
);
const amountRequired = generateError(
  strings.generalErrors.thisValueIsRequired,
  'amount',
);
const amountInvalid = generateError(
  strings.generalErrors.invalidValue,
  'amount',
);

const qtdRequired = generateError(
  strings.generalErrors.thisValueIsRequired,
  'qtd',
);
const qtdInvalid = generateError(strings.generalErrors.invalidValue, 'qtd');
const brandInvalid = generateError(strings.generalErrors.invalidValue, 'brand');

const resultErrorRequired = {
  formTested: 'productList',
  errors: [
    {
      errorItem: 'name',
      errorMessage: strings.generalErrors.thisValueIsRequired,
    },
    {
      errorItem: 'amount',
      errorMessage: strings.generalErrors.thisValueIsRequired,
    },
    {
      errorItem: 'qtd',
      errorMessage: strings.generalErrors.thisValueIsRequired,
    },
  ],
};

const resultErrorInvalid = {
  formTested: 'productList',
  errors: [
    {
      errorItem: 'amount',
      errorMessage: strings.generalErrors.invalidValue,
    },
    {
      errorItem: 'qtd',
      errorMessage: strings.generalErrors.invalidValue,
    },
  ],
};

const productListErrors = {
  nameRequired,
  amountRequired,
  amountInvalid,
  qtdInvalid,
  qtdRequired,
  brandInvalid,
  resultErrorInvalid,
  resultErrorRequired,
};

export { generateError, productListErrors };
