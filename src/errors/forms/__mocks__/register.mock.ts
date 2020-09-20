import strings from '@locales/general-errors';
import { generateError } from './product-items.mock';

export const nameRequired = generateError(
  strings.generalErrors.thisValueIsRequired,
  'name',
);

export const emailRequired = generateError(
  strings.generalErrors.thisValueIsRequired,
  'email',
);

export const passwordRequired = generateError(
  strings.generalErrors.thisValueIsRequired,
  'password',
);

export const passwordShort = generateError(
  strings.login.passwordShort,
  'password',
);

export const confirmPasswordRequired = generateError(
  strings.generalErrors.thisValueIsRequired,
  'confirmPassword',
);

export const confirmPasswordShort = generateError(
  strings.login.passwordShort,
  'confirmPassword',
);

export const passwordNotEqual = generateError(
  strings.register.passwordIsNotEqual,
  'confirmPassword',
);
