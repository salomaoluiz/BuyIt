import * as Yup from 'yup';

import generalErrors from '@locales/general-errors';
import { AuthLoginForm } from '@store/auth/types';

const registerSchema = Yup.object().shape({
  name: Yup.string().required(generalErrors.generalErrors.thisValueIsRequired),
  email: Yup.string()
    .email(generalErrors.login.emailInvalid)
    .required(generalErrors.generalErrors.thisValueIsRequired),
  password: Yup.string()
    .required(generalErrors.generalErrors.thisValueIsRequired)
    .min(6, generalErrors.login.passwordShort),
  confirmPassword: Yup.string()
    .required(generalErrors.generalErrors.thisValueIsRequired)
    .equals([Yup.ref('password')], generalErrors.register.passwordIsNotEqual)
    .min(6, generalErrors.login.passwordShort),
});

const register = async (
  value: Partial<AuthLoginForm>,
): Promise<true | Yup.ValidationError[]> => {
  try {
    await registerSchema.validate(value, {
      abortEarly: false,
    });

    return true;
  } catch (err) {
    return err.inner;
  }
};

export default register;
