import { renderHook, act } from '@testing-library/react-hooks';

import * as useErrorForm from '@errors/useFormError';

import useForm from '../useForm';

const validateError = jest.fn().mockResolvedValue(true);
const handleErrorMessage = jest.fn();
jest.mock('@errors/useFormError');

describe('Login - useForm', () => {
  beforeAll(() => {
    jest.spyOn(useErrorForm, 'default').mockImplementation(() => ({
      validateError,
      handleErrorMessage,
      clearErrors: jest.fn(),
      errorItems: undefined,
    }));
  });

  test('deve inicializar com valores default', () => {
    const { result } = renderHook(useForm);

    const expected = {
      email: '',
      password: '',
    };

    expect(result.current.formParams).toEqual(expected);
  });

  test('ao chamar o checkForm, deve ser chamado o validateError', async () => {
    const { result } = renderHook(useForm);
    let isValid = false;
    
    await act(async () => {
      isValid = await result.current.checkForm();
    });

    expect(validateError).toHaveBeenCalled();
    expect(isValid).toBe(true);
  });
});
