import { RegexPattern } from '@errors/useFirebaseError';
import appLocale from '@locales';

const strings = appLocale();

export type RegexValues = '';

const errorRegex: RegexPattern = {};

const errorStrings = {
  ...strings.errors.productList,
};

export { errorRegex, errorStrings };
