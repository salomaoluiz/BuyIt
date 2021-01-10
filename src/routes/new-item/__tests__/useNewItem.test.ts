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

  test('ao chamar onSaveButtonPress sem um id deve chamar o checkForm e disparar a action createProductItemAsync', async () => {
    const { result } = renderHook(useNewItem, { initialProps });

    await act(async () => {
      await result.current.onSaveButtonPress();
    });

    expect(checkForm).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(
      productListActions.createProductItemAsync(
        initialProps.formParams,
        listId,
      ),
    );
  });

  test('ao chamar onSaveButtonPress a partir do stock sem um id deve chamar o checkForm e disparar a action createItem do stock', async () => {
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

  test('ao chamar onSaveButtonPress com um id deve chamar o checkForm e disparar a action updateProductItemAsync', async () => {
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
      productListActions.updateProductItemAsync(
        newInitialProps.formParams,
        listId,
      ),
    );
  });

  test('ao chamar onSaveButtonPress a partir do stock com um id deve chamar o checkForm e disparar a action updateItem do stock', async () => {
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

  test('ao chamar handleModalVisible passando um status, deve atualizar o status do modal para o status informado', () => {
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

    expect(result.current.modalVisible).toBe(false);

    act(() => {
      result.current.handleModalVisible(true);
    });

    expect(result.current.modalVisible).toBe(true);
  });

  test('ao chamar handleModalVisible nao passando nada, deve atualizar o status do modal para o status inverso ao atual', () => {
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

    expect(result.current.modalVisible).toBe(false);

    act(() => {
      result.current.handleModalVisible();
    });

    expect(result.current.modalVisible).toBe(true);
  });

  test('ao chamar handleDatePickerVisible passando um status, deve atualizar o status do modal para o status informado', () => {
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

    expect(result.current.datePickerVisible).toBe(false);

    act(() => {
      result.current.handleDatePickerVisible(true);
    });

    expect(result.current.datePickerVisible).toBe(true);
  });

  test('ao chamar handleDatePickerVisible nao passando nada, deve atualizar o status do modal para o status inverso ao atual', () => {
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

    expect(result.current.datePickerVisible).toBe(false);

    act(() => {
      result.current.handleDatePickerVisible();
    });

    expect(result.current.datePickerVisible).toBe(true);
  });
});
