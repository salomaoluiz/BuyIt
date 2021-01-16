import { translate } from '@locales';

import { generateError } from './product-items.mock';

export const nameRequired = generateError(
  translate('errors.general.thisValueIsRequired'),
  'name',
);

export const emailRequired = generateError(
  translate('errors.general.thisValueIsRequired'),
  'email',
);

export const passwordRequired = generateError(
  translate('errors.general.thisValueIsRequired'),
  'password',
);

export const passwordShort = generateError(
  translate('errors.auth.passwordShort'),
  'password',
);

export const confirmPasswordRequired = generateError(
  translate('errors.general.thisValueIsRequired'),
  'confirmPassword',
);

export const confirmPasswordShort = generateError(
  translate('errors.auth.passwordShort'),
  'confirmPassword',
);

export const passwordNotEqual = generateError(
  translate('errors.auth.passwordIsNotEqual'),
  'confirmPassword',
);
