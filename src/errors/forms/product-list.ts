import * as Yup from 'yup';
import strings from '@locales/general-errors';
import { ProductItem } from '@store/product-list/types';

const productListSchema = Yup.object().shape({
  name: Yup.string()
    .required(strings.generalErrors.thisValueIsRequired)
    .max(100, strings.generalErrors.theValueIsMuchLong),
});

const productList = async (
  value: Partial<ProductItem>,
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
