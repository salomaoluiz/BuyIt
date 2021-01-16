import * as Yup from 'yup';

import { translate } from '@locales';

const register = Yup.object().shape({
  name: Yup.string().required(translate('errors.general.thisValueIsRequired')),
  email: Yup.string()
    .email(translate('errors.auth.emailInvalid'))
    .required(translate('errors.general.thisValueIsRequired')),
  password: Yup.string()
    .required(translate('errors.general.thisValueIsRequired'))
    .min(6, translate('errors.auth.passwordShort')),
  confirmPassword: Yup.string()
    .required(translate('errors.general.thisValueIsRequired'))
    .equals([Yup.ref('password')], translate('errors.auth.passwordIsNotEqual'))
    .min(6, translate('errors.auth.passwordShort')),
});

export default register;
