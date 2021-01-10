import * as navigation from '@react-navigation/native';
import { renderHook, act } from '@testing-library/react-hooks';
import * as reactRedux from 'react-redux';

import { productListActions } from '@store/product-list';
import { stockActions } from '@store/stock';

import useNewItem from '../useNewItem';

jest.mock('@react-navigation/native');

const dispatch = jest.fn();

describe('NewItem - useNewItem', () => {
  const listId = '123456';
  let useRouteSpy: jest.SpyInstance;
  beforeEach(() => {
    jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(dispatch);
    jest.spyOn(reactRedux, 'useSelector').mockReturnValue(true);
    useRouteSpy = jest.spyOn(navigation, 'useRoute').mockReturnValue({
      key: '',
      name: 'NewItem',
      params: { action: productListActions, listId },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const checkForm = jest.fn().mockResolvedValue(true);

  const initialProps = {
    formParams: {
      id: undefined,
      name: '',
      amount: '',
      qtd: '',
      unit: undefined,
      brand: '',
    },
    checkForm,
  };

  test('ao clicar no botão de salvar na tela de novo item da lista, deve disparar a action para criar um item na lista', async () => {
    const { result } = renderHook(useNewItem, { initialProps });

    await act(async () => {
      await result.current.onSaveButtonPress();
    });

    expect(checkForm).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(
      productListActions.createItem(initialProps.formParams, listId),
    );
  });

  test('ao clicar no botão de salvar na tela de novo item do stock, deve disparar a action para criar um item no stock', async () => {
    useRouteSpy.mockReturnValue({
      key: '',
      name: 'NewItem',
      params: { action: stockActions },
    });

    const { result } = renderHook(useNewItem, { initialProps });

    await act(async () => {
      await result.current.onSaveButtonPress();
    });

    expect(checkForm).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(
      stockActions.createItem(initialProps.formParams),
    );
  });

  test('ao clicar no botão de salvar na tela de novo item da lista tendo o id no form, deve disparar a action para atualizar o item do id', async () => {
    const newInitialProps = {
      ...initialProps,
      formParams: {
        ...initialProps.formParams,
        id: '123456',
      },
    };
    const { result } = renderHook(useNewItem, {
      initialProps: newInitialProps,
    });

    await act(async () => {
      await result.current.onSaveButtonPress();
    });

    expect(checkForm).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(
      productListActions.updateItem(newInitialProps.formParams, listId),
    );
  });

  test('ao clicar no botão de salvar na tela de novo item do stock tendo o id no form, deve disparar a action para atualizar o item do id', async () => {
    useRouteSpy.mockReturnValue({
      key: '',
      name: 'NewItem',
      params: { action: stockActions },
    });

    const newInitialProps = {
      ...initialProps,
      formParams: { ...initialProps.formParams, id: '123456' },
    };
    const { result } = renderHook(useNewItem, {
      initialProps: newInitialProps,
    });

    await act(async () => {
      await result.current.onSaveButtonPress();
    });

    expect(checkForm).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(
      stockActions.updateItem(newInitialProps.formParams),
    );
  });

  test('caso passe um valor para o modal, deve atualizar o status para o valor passado', () => {
    const { result } = renderHook(useNewItem, {
      initialProps,
    });

    expect(result.current.modalVisible).toBe(false);

    act(() => {
      result.current.handleModalVisible(true);
    });

    expect(result.current.modalVisible).toBe(true);
  });

  test('caso nao passe um valor pro modal, deve atualizar o status do modal para o status inverso ao atual', () => {
    const { result } = renderHook(useNewItem, {
      initialProps,
    });

    expect(result.current.modalVisible).toBe(false);

    act(() => {
      result.current.handleModalVisible();
    });

    expect(result.current.modalVisible).toBe(true);
  });

  test('caso passe um valor para o date picker, deve atualizar o status do modal para o status informado', () => {
    const { result } = renderHook(useNewItem, {
      initialProps,
    });

    expect(result.current.datePickerVisible).toBe(false);

    act(() => {
      result.current.handleDatePickerVisible(true);
    });

    expect(result.current.datePickerVisible).toBe(true);
  });

  test('caso passe um valor para o date picker, deve atualizar o status do modal para o status inverso ao atual', () => {
    const { result } = renderHook(useNewItem, {
      initialProps,
    });

    expect(result.current.datePickerVisible).toBe(false);

    act(() => {
      result.current.handleDatePickerVisible();
    });

    expect(result.current.datePickerVisible).toBe(true);
  });

  test('caso passe um valor para o modal da camera, deve atualizar o status para o passado', () => {
    const { result } = renderHook(useNewItem, {
      initialProps,
    });

    expect(result.current.barcodeCameraVisible).toBe(false);

    act(() => {
      result.current.handleBarcodeCameraVisibility(true);
    });

    expect(result.current.barcodeCameraVisible).toBe(true);
  });

  test('caso nao passe um valor para o modal da camera, deve atualizar o status para o inverso do status atual', () => {
    const { result } = renderHook(useNewItem, {
      initialProps,
    });

    expect(result.current.barcodeCameraVisible).toBe(false);

    act(() => {
      result.current.handleBarcodeCameraVisibility();
    });

    expect(result.current.barcodeCameraVisible).toBe(true);
  });
});
