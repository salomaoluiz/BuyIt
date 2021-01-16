import { translate } from '@locales';

import { generateError } from './product-items.mock';

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
