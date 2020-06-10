import * as Yup from 'yup';
import strings from '@locales/general-errors';
import { ItemsData } from '@routes/product-list/store/types';

const onlyNumber = /^[0-9]*$/g;

const productListSchema = Yup.object().shape({
  name: Yup.string().required(strings.generalErrors.thisValueIsRequired),
  amount: Yup.string()
    .required(strings.generalErrors.thisValueIsRequired)
    .matches(onlyNumber, strings.generalErrors.invalidValue),
  qtd: Yup.string()
    .required(strings.generalErrors.thisValueIsRequired)
    .typeError(strings.generalErrors.invalidValue)
    .matches(onlyNumber, strings.generalErrors.invalidValue),
  brand: Yup.string().typeError(strings.generalErrors.invalidValue),
});

const productList = async (
  value: Partial<ItemsData>,
): Promise<true | Yup.ValidationError[]> => {
  try {
    await productListSchema.validate(value, {
      abortEarly: false,
    });

    return true;
  } catch (err) {
    return err.inner;
  }
};

export default productList;
