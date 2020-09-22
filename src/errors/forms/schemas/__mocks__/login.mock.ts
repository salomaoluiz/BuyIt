import appLocale from '@locales';
import { generateError } from './product-items.mock';

const strings = appLocale();

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
