import * as Yup from 'yup';

import { translate } from '@locales';

const login = Yup.object().shape({
  email: Yup.string()
    .email(translate('errors.auth.emailInvalid'))
    .required(translate('errors.general.thisValueIsRequired')),
  password: Yup.string()
    .required(translate('errors.general.thisValueIsRequired'))
    .min(6, translate('errors.auth.passwordShort')),
});

export default login;
