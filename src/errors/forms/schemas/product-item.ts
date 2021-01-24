import * as Yup from 'yup';

import { translate } from '@locales';

const numberWithDot = /^[0-9]*[.]?[0-9]*$/g;
const onlyNumber = /^[0-9]*$/g;
const sizeLimit = 10000000;

const validateMax = (value: string) => {
  const parsedValue = parseFloat(value);

  if (parsedValue > sizeLimit) return false;
  return true;
};

const productItem = Yup.object().shape({
  name: Yup.string().required(translate('errors.general.thisValueIsRequired')),
  amount: Yup.string()
    .required(translate('errors.general.thisValueIsRequired'))
    .test(
      'lower-then-100000',
      translate('errors.general.theValueIsMuchLong'),
      validateMax,
    )
    .matches(
      numberWithDot,
      translate('errors.productList.invalidValueUseOnlyDot'),
    ),
  qtd: Yup.string()
    .required(translate('errors.general.thisValueIsRequired'))
    .test(
      'lower-then-100000',
      translate('errors.general.theValueIsMuchLong'),
      validateMax,
    )
    .matches(onlyNumber, translate('errors.general.invalidValue')),
  dueDate: Yup.number().min(
    Date.now(),
    translate('errors.general.dateHigherThanToday'),
  ),
  brand: Yup.string().typeError(translate('errors.general.invalidValue')),
  unit: Yup.string().required(translate('errors.general.thisValueIsRequired')),
});

export default productItem;
