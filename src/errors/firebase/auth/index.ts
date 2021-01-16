import { RegexPattern } from '@errors/useFirebaseError';
import { translate } from '@locales';

export type RegexValues = 'emailAlreadyInUse' | 'emailInvalid' | 'weakPassword';

const errorRegex: RegexPattern = {
  'email-already-in-use': translate('errors.auth.emailAlreadyInUse'),
  'invalid-email': translate('errors.auth.emailInvalid'),
  'weak-password': translate('errors.auth.weakPassword'),
};

export { errorRegex };
