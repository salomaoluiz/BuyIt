import useFirebaseError from '@errors/useFirebaseError';
import strings from '@locales/general-errors';
import * as auth from '../firebase/auth';

describe('useFirebaseError', () => {
  test('deve procurar o erro na lista de errors e retorna-lo', () => {
    const { _filterError } = useFirebaseError('auth');

    expect(_filterError(auth.errorRegex.emailAlreadyInUse)).toEqual(
      'emailAlreadyInUse',
    );
  });

  test('deve procurar o erro na lista de errors e retornar o texto desse erro dos locales', () => {
    const { getErrorMessage } = useFirebaseError('auth');

    expect(getErrorMessage('email-already-in-use')).toEqual(
      strings.register.emailAlreadyInUse,
    );
  });

  test('deve validar se é um erro do firebase', () => {
    const { isFirebaseError } = useFirebaseError('auth');

    expect(isFirebaseError('firebase/email-already-in-use')).toEqual(true);
  });

  test('deve validar se é um erro do firebase', () => {
    const { isFirebaseError } = useFirebaseError('auth');

    expect(isFirebaseError('firebase/email-already-in-use')).toEqual(true);
  });
});
