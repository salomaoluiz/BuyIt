import { translate } from '@locales';

import * as auth from './firebase/auth';
import * as productLists from './firebase/productLists';

type Modules = 'auth' | 'productLists';
export type RegexPattern = { [key: string]: string };
type ErrorPattern = auth.RegexValues;
type ModulesPattern = {
  [key: string]: { errorRegex: RegexPattern };
};

const modules: ModulesPattern = {
  auth,
  productLists,
};

const useFirebaseError = (module: Modules) => {
  const errorRegex = modules[module].errorRegex;

  const _filterError = (errorResponse: string) => {
    let error;
    for (const key in errorRegex) {
      if (errorResponse.includes(key)) {
        error = key;
      }
    }

    return error as ErrorPattern;
  };

  const filterErrorMessage = (errorResponse: string) => {
    const errorKey = _filterError(errorResponse);

    if (errorKey) {
      return errorRegex[errorKey];
    }
  };

  const getErrorMessage = (errorResponse: string) => {
    const errorMessage = filterErrorMessage(errorResponse);

    return errorMessage || translate('errors.general.tryAgainLater');
  };

  const isFirebaseError = (error: string) => {
    return error.includes('firebase');
  };

  return { getErrorMessage, isFirebaseError, _filterError };
};

export default useFirebaseError;
