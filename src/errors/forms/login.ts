import * as Yup from 'yup';

import generalErrors from '@locales/general-errors';
import { AuthLoginForm } from '@store/auth/types';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email(generalErrors.login.emailInvalid)
    .required(generalErrors.generalErrors.thisValueIsRequired),
  password: Yup.string()
    .required(generalErrors.generalErrors.thisValueIsRequired)
    .min(6, generalErrors.login.passwordShort),
});

const login = async (
  value: Partial<AuthLoginForm>,
): Promise<true | Yup.ValidationError[]> => {
  try {
    await loginSchema.validate(value, {
      abortEarly: false,
    });

    return true;
  } catch (err) {

    return err.inner;
  }
};

export default login;
