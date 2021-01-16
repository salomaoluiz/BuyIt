import { translate } from '@locales';

import { generateError } from './product-items.mock';

export const nameRequired = generateError(
  translate('errors.general.thisValueIsRequired'),
  'name',
);

export const nameIsMuchLong = generateError(
  translate('errors.general.theValueIsMuchLong'),
  'name',
);
