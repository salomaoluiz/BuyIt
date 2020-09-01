import * as Yup from 'yup';
import strings from '@locales/general-errors';
import { ProductItem } from '@store/product-list/types';

const numberWithDot = /^\d*[.]?\d$/g;
const onlyNumber = /^\d$/g;

const productItemSchema = Yup.object().shape({
  name: Yup.string().required(strings.generalErrors.thisValueIsRequired),
  amount: Yup.string()
    .required(strings.generalErrors.thisValueIsRequired)
    .matches(numberWithDot, strings.generalErrors.invalidValueUseOnlyDot),
  qtd: Yup.string()
    .required(strings.generalErrors.thisValueIsRequired)
    .typeError(strings.generalErrors.invalidValue)
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
