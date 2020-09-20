import * as auth from './firebase/auth';
import * as productLists from './firebase/productLists';
import { RegexValues } from './firebase/auth';
import strings from '@locales/general-errors';

type Modules = 'auth' | 'productLists';
export type RegexPattern = { [key: string]: string };
type ErrorPattern = RegexValues;
type ModulesPattern = {
  [key: string]: { errorRegex: RegexPattern; errorStrings: RegexPattern };
};

const modules: ModulesPattern = {
  auth,
  productLists,
};

const useFirebaseError = (module: Modules) => {
  const errorRegex = modules[module].errorRegex;
  const errorStrings = modules[module].errorStrings;

  const _filterError = (errorResponse: string) => {
    let error;
    for (const key in errorRegex) {
      const regex = errorRegex[key];
      if (errorResponse.includes(regex)) {
        error = key;
      }
    }

    return error as ErrorPattern;
  };

  const filterErrorMessage = (errorResponse: string) => {
    const errorKey = _filterError(errorResponse);

    if (errorKey) {
      return errorStrings[errorKey];
    }
  };

  const getErrorMessage = (errorResponse: string) => {
    const errorMessage = filterErrorMessage(errorResponse);

    return errorMessage || strings.generalErrors.tryAgainLater;
  };

  const isFirebaseError = (error: string) => {
    return error.includes('firebase');
  };

  return { getErrorMessage, isFirebaseError, _filterError };
};

export default useFirebaseError;
