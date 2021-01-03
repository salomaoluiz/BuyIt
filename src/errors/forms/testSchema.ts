import * as Yup from 'yup';

import { FormName, FormValues } from './';
import login from './schemas/login';
import productItem from './schemas/product-item';
import productList from './schemas/product-list';
import register from './schemas/register';

const validationSchemas = {
  productItem,
  login,
  register,
  productList,
};

const testSchema = async (
  schema: FormName,
  value: Partial<FormValues>,
): Promise<true | Yup.ValidationError[]> => {
  try {
    const formSchema = validationSchemas[schema];

    await formSchema.validate(value, {
      abortEarly: false,
    });

    return true;
  } catch (err) {
    return err.inner;
  }
};

export default testSchema;
