import appLocale from '@locales';
import { ValidationError } from 'yup';
import { ErrorInterface } from '../..';

const strings = appLocale();

const generateError = (errorText: string | string[], path: string) => {
  return new ValidationError(errorText, '', path);
};

const nameRequired = generateError(
  strings.errors.general.thisValueIsRequired,
  'name',
);
const amountRequired = generateError(
  strings.errors.general.thisValueIsRequired,
  'amount',
);
const amountInvalid = generateError(
  strings.errors.productList.invalidValueUseOnlyDot,
  'amount',
);

const qtdRequired = generateError(
  strings.errors.general.thisValueIsRequired,
  'qtd',
);
const qtdInvalid = generateError(strings.errors.general.invalidValue, 'qtd');
const brandInvalid = generateError(
  strings.errors.general.invalidValue,
  'brand',
);
const amountIsMuchLong = generateError(
  strings.errors.general.theValueIsMuchLong,
  'amount',
);
const qtdIsMuchLong = generateError(
  strings.errors.general.theValueIsMuchLong,
  'qtd',
);
const unitRequired = generateError(
  strings.errors.general.thisValueIsRequired,
  'unit',
);

const resultErrorRequired: ErrorInterface = {
  formTested: 'productItem',
  errors: [
    {
      errorItem: 'name',
      errorMessage: strings.errors.general.thisValueIsRequired,
    },
    {
      errorItem: 'amount',
      errorMessage: strings.errors.general.thisValueIsRequired,
    },
    {
      errorItem: 'qtd',
      errorMessage: strings.errors.general.thisValueIsRequired,
    },
    {
      errorItem: 'unit',
      errorMessage: strings.errors.general.thisValueIsRequired,
    },
  ],
};

const resultErrorInvalid: ErrorInterface = {
  formTested: 'productItem',
  errors: [
    {
      errorItem: 'amount',
      errorMessage: strings.errors.productList.invalidValueUseOnlyDot,
    },
    {
      errorItem: 'qtd',
      errorMessage: strings.errors.general.invalidValue,
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
  unitRequired,
};

export { generateError, productListErrors };
