import * as Yup from 'yup';

import appLocale from '@locales';

const strings = appLocale();

const login = Yup.object().shape({
  email: Yup.string()
    .email(strings.errors.auth.emailInvalid)
    .required(strings.errors.general.thisValueIsRequired),
  password: Yup.string()
    .required(strings.errors.general.thisValueIsRequired)
    .min(6, strings.errors.auth.passwordShort),
});

export default login;
