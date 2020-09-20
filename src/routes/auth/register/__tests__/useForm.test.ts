import { renderHook, act } from '@testing-library/react-hooks';
import useForm from '../useForm';
import * as useErrorForm from '@errors/useFormError';
import * as navigation from '@react-navigation/native';
import { Routes } from '@routes';

const validateError = jest.fn().mockResolvedValue(true);
const handleErrorMessage = jest.fn();

jest.mock('@errors/useFormError');
jest.mock('@react-navigation/native');

describe('Login - useForm', () => {
  beforeAll(() => {
    jest.spyOn(useErrorForm, 'default').mockImplementation(() => ({
      validateError,
      handleErrorMessage,
      clearErrors: jest.fn(),
      errorItems: undefined,
    }));

    jest.spyOn(navigation, 'useRoute').mockReturnValue({
      name: Routes.RegisterUser,
      params: { email: '' },
      key: '1234',
    });
  });

  test('deve inicializar com valores default', () => {
    const { result } = renderHook(useForm);

    const expected = {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
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
