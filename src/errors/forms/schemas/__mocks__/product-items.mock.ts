import { ValidationError } from 'yup';

import { translate } from '@locales';

import { ErrorInterface } from '../../';

const generateError = (errorText: string | string[], path: string) => {
  return new ValidationError(errorText, '', path);
};

const nameRequired = generateError(
  translate('errors.general.thisValueIsRequired'),
  'name',
);
const amountRequired = generateError(
  translate('errors.general.thisValueIsRequired'),
  'amount',
);
const amountInvalid = generateError(
  translate('errors.productList.invalidValueUseOnlyDot'),
  'amount',
);

const qtdRequired = generateError(
  translate('errors.general.thisValueIsRequired'),
  'qtd',
);
const qtdInvalid = generateError(
  translate('errors.general.invalidValue'),
  'qtd',
);
const brandInvalid = generateError(
  translate('errors.general.invalidValue'),
  'brand',
);
const amountIsMuchLong = generateError(
  translate('errors.general.theValueIsMuchLong'),
  'amount',
);
const dueDateIsLowerThanToday = generateError(
  translate('errors.general.dateHigherThanToday'),
  'dueDate',
);
const qtdIsMuchLong = generateError(
  translate('errors.general.theValueIsMuchLong'),
  'qtd',
);
const unitRequired = generateError(
  translate('errors.general.thisValueIsRequired'),
  'unit',
);

const resultErrorRequired: ErrorInterface = {
  formTested: 'productItem',
  errors: [
    {
      errorItem: 'name',
      errorMessage: translate('errors.general.thisValueIsRequired'),
    },
    {
      errorItem: 'amount',
      errorMessage: translate('errors.general.thisValueIsRequired'),
    },
    {
      errorItem: 'qtd',
      errorMessage: translate('errors.general.thisValueIsRequired'),
    },
  ],
};

const resultErrorInvalid: ErrorInterface = {
  formTested: 'productItem',
  errors: [
    {
      errorItem: 'amount',
      errorMessage: translate('errors.productList.invalidValueUseOnlyDot'),
    },
    {
      errorItem: 'qtd',
      errorMessage: translate('errors.general.invalidValue'),
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
  dueDateIsLowerThanToday,
};

export { generateError, productListErrors };
