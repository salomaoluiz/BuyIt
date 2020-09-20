import * as Yup from 'yup';
import appLocale from '@locales';

const strings = appLocale();

const numberWithDot = /^[0-9]*[.]?[0-9]*$/g;
const onlyNumber = /^[0-9]*$/g;
const sizeLimit = 10000000;

const validateMax = (value: string) => {
  const parsedValue = parseFloat(value);

  if (parsedValue > sizeLimit) return false;
  return true;
};

const productItem = Yup.object().shape({
  name: Yup.string().required(strings.errors.general.thisValueIsRequired),
  amount: Yup.string()
    .required(strings.errors.general.thisValueIsRequired)
    .test(
      'lower-then-100000',
      strings.errors.general.theValueIsMuchLong,
      validateMax,
    )
    .matches(numberWithDot, strings.errors.productList.invalidValueUseOnlyDot),
  qtd: Yup.string()
    .required(strings.errors.general.thisValueIsRequired)
    .test(
      'lower-then-100000',
      strings.errors.general.theValueIsMuchLong,
      validateMax,
    )
    .matches(onlyNumber, strings.errors.general.invalidValue),
  brand: Yup.string().typeError(strings.errors.general.invalidValue),
});

export default productItem;
