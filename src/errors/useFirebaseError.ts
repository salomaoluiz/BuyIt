import * as auth from './firebase/auth';
import { RegisterRegexValues } from './firebase/auth';
import strings from '@locales/general-errors';

type Modules = 'auth';
export type RegexPattern = { [key: string]: string };
type ErrorPattern = RegisterRegexValues;
type ModulesPattern = {
  [key: string]: { errorRegex: RegexPattern; errorStrings: RegexPattern };
};

const modules: ModulesPattern = {
  auth,
};

const useFirebaseError = (module: Modules) => {
  const errorRegex = modules[module].errorRegex;
  const errorStrings = modules[module].errorStrings;

  const filterError = (errorResponse: string) => {
    let error;
    for (const key in modules[module].errorRegex) {
      const regex = errorRegex[key];
      if (errorResponse.includes(regex)) {
        error = key;
      }
    }

    return error as ErrorPattern;
  };

  const filterErrorMessage = (errorResponse: string) => {
    const errorKey = filterError(errorResponse);

    if (errorKey) {
      return errorStrings[errorKey];
    }
  };

  const getErrorMessage = (errorResponse: string) => {
    const errorMessage = filterErrorMessage(errorResponse);

    return errorMessage || strings.generalErrors.tryAgainLater;
  };

  return { getErrorMessage };
};

export default useFirebaseError;
