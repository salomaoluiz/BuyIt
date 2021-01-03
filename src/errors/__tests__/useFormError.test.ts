import { act, renderHook } from '@testing-library/react-hooks';

import useFormError from '@errors/useFormError';
import { ProductListForm } from '@store/product-list/types';

import * as forms from '../forms';

describe('useFormError', () => {
  test('ao tentar validar o formulario, se tiver um erro a funcao deve retornar falso e setar a lista de erros', async () => {
    jest.spyOn(forms, 'default').mockResolvedValue({
      errors: [{ errorItem: 'name', errorMessage: 'Esse valor é obrigatório' }],
      formTested: 'productList',
    });

    const formParams: ProductListForm = {
      name: '',
    };

    const { result } = renderHook(useFormError, {
      initialProps: { formParams, formName: 'productList' },
    });

    let isFormValid;
    await act(async () => {
      isFormValid = await result.current.validateError();
    });

    expect(isFormValid).toBe(false);
    expect(result.current.errorItems).toEqual({
      errors: [{ errorItem: 'name', errorMessage: 'Esse valor é obrigatório' }],
      formTested: 'productList',
    });
  });

  test('ao tentar validar o formulario, se nao possuir erro deve retornar true e a lista de erros deve permanecer vazia', async () => {
    jest.spyOn(forms, 'default').mockResolvedValue(undefined);

    const formParams: ProductListForm = {
      name: '',
    };

    const { result } = renderHook(useFormError, {
      initialProps: { formParams, formName: 'productList' },
    });

    let isFormValid;
    await act(async () => {
      isFormValid = await result.current.validateError();
    });

    expect(isFormValid).toBe(true);
    expect(result.current.errorItems).toEqual(undefined);
  });

  test('caso a validação tenha resultado em erro, ao chamar o handleErrorMessage deve retornar como helperText a mensagem de erro', async () => {
    jest.spyOn(forms, 'default').mockResolvedValue({
      errors: [{ errorItem: 'name', errorMessage: 'Esse valor é obrigatório' }],
      formTested: 'productList',
    });

    const formParams: ProductListForm = {
      name: '',
    };

    const { result } = renderHook(useFormError, {
      initialProps: { formParams, formName: 'productList' },
    });

    await act(async () => {
      await result.current.validateError();
    });

    let helperTexts;
    act(() => {
      helperTexts = result.current.handleErrorMessage('name');
    });

    expect(helperTexts).toEqual({
      error: true,
      helperText: 'Esse valor é obrigatório',
    });
  });

  test('caso a validação nao tenha erro, ao chamar o handleErrorMessage deve retornar o helperText passado como parâmetro', async () => {
    jest.spyOn(forms, 'default').mockResolvedValue(undefined);

    const formParams: ProductListForm = {
      name: '',
    };

    const { result } = renderHook(useFormError, {
      initialProps: { formParams, formName: 'productList' },
    });

    await act(async () => {
      await result.current.validateError();
    });

    let helperTexts;
    act(() => {
      helperTexts = result.current.handleErrorMessage('name', 'Helper Text');
    });

    expect(helperTexts).toEqual({ helperText: 'Helper Text' });
  });

  test('ao chamar o cleanErrors deve limpar todos os erros', async () => {
    jest.spyOn(forms, 'default').mockResolvedValue({
      errors: [{ errorItem: 'name', errorMessage: 'Esse valor é obrigatório' }],
      formTested: 'productList',
    });

    const formParams: ProductListForm = {
      name: '',
    };

    const { result } = renderHook(useFormError, {
      initialProps: { formParams, formName: 'productList' },
    });

    await act(async () => {
      await result.current.validateError();
    });

    expect(result.current.errorItems).toEqual({
      errors: [{ errorItem: 'name', errorMessage: 'Esse valor é obrigatório' }],
      formTested: 'productList',
    });

    act(() => {
      result.current.clearErrors();
    });

    expect(result.current.errorItems).toEqual(undefined);
  });
});
