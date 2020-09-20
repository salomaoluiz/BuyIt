import * as Yup from 'yup';
import strings from '@locales/general-errors';
import { ProductItem } from '@store/product-list/types';

const numberWithDot = /^[0-9]*[.]?[0-9]*$/g;
const onlyNumber = /^[0-9]*$/g;
const sizeLimit = 10000000;

const validateMax = (value: string) => {
  const parsedValue = parseFloat(value);

  if (parsedValue > sizeLimit) return false;
  return true;
};

const productItemSchema = Yup.object().shape({
  name: Yup.string().required(strings.generalErrors.thisValueIsRequired),
  amount: Yup.string()
    .required(strings.generalErrors.thisValueIsRequired)
    .test(
      'lower-then-100000',
      strings.generalErrors.theValueIsMuchLong,
      validateMax,
    )
    .matches(numberWithDot, strings.generalErrors.invalidValueUseOnlyDot),
  qtd: Yup.string()
    .required(strings.generalErrors.thisValueIsRequired)
    .test(
      'lower-then-100000',
      strings.generalErrors.theValueIsMuchLong,
      validateMax,
    )
    .matches(onlyNumber, strings.generalErrors.invalidValue),
  brand: Yup.string().typeError(strings.generalErrors.invalidValue),
});

const productItem = async (
  value: Partial<ProductItem>,
): Promise<true | Yup.ValidationError[]> => {
  try {
    await productItemSchema.validate(value, {
      abortEarly: false,
    });

    return true;
  } catch (err) {
    return err.inner;
  }
};

export default productItem;
