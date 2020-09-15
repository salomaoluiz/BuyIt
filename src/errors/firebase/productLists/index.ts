import { errors as errorStrings } from '@locales/register';
import { RegexPattern } from '@errors/useFirebaseError';

export type RegexValues =
  | 'emailAlreadyInUse'
  | 'emailInvalid'
  | 'weakPassword';

const errorRegex: RegexPattern = {
  emailAlreadyInUse: 'email-already-in-use',
  emailInvalid: 'invalid-email',
  weakPassword: 'weak-password',
};

export { errorRegex, errorStrings };
