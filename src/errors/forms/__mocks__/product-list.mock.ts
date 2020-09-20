import strings from '@locales/general-errors';
import { generateError } from './product-items.mock';

export const nameRequired = generateError(
  strings.generalErrors.thisValueIsRequired,
  'name',
);

export const nameIsMuchLong = generateError(
  strings.generalErrors.theValueIsMuchLong,
  'name',
);
