import * as navigation from '@react-navigation/native';
import { renderHook, act } from '@testing-library/react-hooks';

import * as useErrorForm from '@errors/useFormError';

import useForm from '../useForm';

const validateError = jest.fn().mockResolvedValue(true);
const handleErrorMessage = jest.fn();
jest.mock('@react-navigation/native');
jest.mock('@errors/useFormError');

describe('NewItem - useForm', () => {
  beforeAll(() => {
    jest.spyOn(navigation, 'useRoute').mockReturnValue({
      params: {
        listId: '123456',
      },
      key: '1234',
      name: 'NewListItem',
    });
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
      id: undefined,
      name: '',
      amount: '',
      qtd: '',
      unit: { id: 'un', title: 'Unidade' },
      brand: '',
      barcode: undefined,
      dueDate: undefined,
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
