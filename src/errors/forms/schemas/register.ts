import * as Yup from 'yup';
import appLocale from '@locales';

const strings = appLocale();

const register = Yup.object().shape({
  name: Yup.string().required(strings.errors.general.thisValueIsRequired),
  email: Yup.string()
    .email(strings.errors.auth.emailInvalid)
    .required(strings.errors.general.thisValueIsRequired),
  password: Yup.string()
    .required(strings.errors.general.thisValueIsRequired)
    .min(6, strings.errors.auth.passwordShort),
  confirmPassword: Yup.string()
    .required(strings.errors.general.thisValueIsRequired)
    .equals([Yup.ref('password')], strings.errors.auth.passwordIsNotEqual)
    .min(6, strings.errors.auth.passwordShort),
});

export default register;
