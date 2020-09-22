import { RegexPattern } from '@errors/useFirebaseError';
import appLocale from '@locales';

const strings = appLocale();

export type RegexValues = 'emailAlreadyInUse' | 'emailInvalid' | 'weakPassword';

const errorRegex: RegexPattern = {
  emailAlreadyInUse: 'email-already-in-use',
  emailInvalid: 'invalid-email',
  weakPassword: 'weak-password',
};

const errorStrings = { ...strings.errors.auth };

export { errorRegex, errorStrings };
