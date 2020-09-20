import strings from '@locales/general-errors';
import { ValidationError } from 'yup';
import { ErrorInterface } from '..';

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
  strings.generalErrors.invalidValueUseOnlyDot,
  'amount',
);

const qtdRequired = generateError(
  strings.generalErrors.thisValueIsRequired,
  'qtd',
);
const qtdInvalid = generateError(strings.generalErrors.invalidValue, 'qtd');
const brandInvalid = generateError(strings.generalErrors.invalidValue, 'brand');
const amountIsMuchLong = generateError(
  strings.generalErrors.theValueIsMuchLong,
  'amount',
);
const qtdIsMuchLong = generateError(
  strings.generalErrors.theValueIsMuchLong,
  'qtd',
);

const resultErrorRequired: ErrorInterface = {
  formTested: 'productItem',
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

const resultErrorInvalid: ErrorInterface = {
  formTested: 'productItem',
  errors: [
    {
      errorItem: 'amount',
      errorMessage: strings.generalErrors.invalidValueUseOnlyDot,
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
  amountIsMuchLong,
  qtdIsMuchLong,
};

export { generateError, productListErrors };
