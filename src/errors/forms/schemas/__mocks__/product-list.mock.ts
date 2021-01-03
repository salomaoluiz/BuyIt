import appLocale from '@locales';

import { generateError } from './product-items.mock';

const strings = appLocale();

export const nameRequired = generateError(
  strings.errors.general.thisValueIsRequired,
  'name',
);

export const nameIsMuchLong = generateError(
  strings.errors.general.theValueIsMuchLong,
  'name',
);
