import appLocale from '@locales';
import { generateError } from './product-items.mock';

const strings = appLocale();

export const nameRequired = generateError(
  strings.errors.general.thisValueIsRequired,
  'name',
);

export const emailRequired = generateError(
  strings.errors.general.thisValueIsRequired,
  'email',
);

export const passwordRequired = generateError(
  strings.errors.general.thisValueIsRequired,
  'password',
);

export const passwordShort = generateError(
  strings.errors.auth.passwordShort,
  'password',
);

export const confirmPasswordRequired = generateError(
  strings.errors.general.thisValueIsRequired,
  'confirmPassword',
);

export const confirmPasswordShort = generateError(
  strings.errors.auth.passwordShort,
  'confirmPassword',
);

export const passwordNotEqual = generateError(
  strings.errors.auth.passwordIsNotEqual,
  'confirmPassword',
);
