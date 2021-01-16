import useFirebaseError from '@errors/useFirebaseError';
import { translate } from '@locales';

describe('useFirebaseError', () => {
  const firebaseErrors = useFirebaseError('auth');

  // should search the error in list of errors and return they
  test('deve procurar o erro na lista de errors e retorna-lo', () => {
    const { _filterError } = firebaseErrors;

    expect(_filterError('email-already-in-use')).toEqual(
      'email-already-in-use',
    );
  });

  // if not found the error in list, should't do nothing
  test('caso não ache o erro na lista, não deve fazer nada', () => {
    const { _filterError } = firebaseErrors;

    expect(_filterError('not-exists')).toEqual(undefined);
  });

  // should search the error in list of errors and return the text to this errors from locales
  test('deve procurar o erro na lista de errors e retornar o texto desse erro dos locales', () => {
    const { getErrorMessage } = firebaseErrors;

    expect(getErrorMessage('email-already-in-use')).toEqual(
      translate('errors.auth.emailAlreadyInUse'),
    );
  });

  // if not fount the error in list of errors should return a default text
  test('caso não encontre o erro na lista de erros, deve retornar um texto default', () => {
    const { getErrorMessage } = firebaseErrors;

    expect(getErrorMessage('not-exists')).toEqual(
      translate('errors.general.tryAgainLater'),
    );
  });

  // should validate if is a firebase error
  test('deve validar se é um erro do firebase', () => {
    const { isFirebaseError } = firebaseErrors;

    expect(isFirebaseError('firebase/email-already-in-use')).toEqual(true);
  });
});
