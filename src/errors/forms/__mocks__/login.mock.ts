import strings from '@locales/general-errors';
import { generateError } from './product-items.mock';

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
