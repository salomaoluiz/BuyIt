import { renderHook, act } from '@testing-library/react-hooks';
import * as reactRedux from 'react-redux';

import { productListActions } from '@store/product-list';

import useNewList from '../useNewList';

const dispatch = jest.fn();

describe('NewList - useNewList', () => {
  beforeAll(() => {
    jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(dispatch);
    jest.spyOn(reactRedux, 'useSelector').mockReturnValue(true);
  });
  const checkForm = jest.fn().mockResolvedValue(true);
  const initialProps = {
    listParams: {
      id: undefined,
      name: '',
      buyDate: undefined,
      items: [],
    },
    checkForm,
  };

  // when the onAddPress is called without a id, should call checkForm and dispatch the action createProductListAsync
  test('ao chamar onAddPress sem id deve chamar o checkForm e disparar a action createProductListAsync', async () => {
    const { result } = renderHook(useNewList, { initialProps });

    await act(async () => {
      await result.current.onAddPress();
    });

    expect(checkForm).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(
      productListActions.createList(initialProps.listParams),
    );
  });

  // when the onAddPress is called with a id, should call the checkForm and dispatch the action updateProductAsync
  test('ao chamar onAddPress com um id deve chamar o checkForm e disparar a action updateProductListAsync', async () => {
    const newInitialProps = {
      ...initialProps,
      listParams: {
        ...initialProps.listParams,
        id: '123456',
      },
    };
    const { result } = renderHook(useNewList, {
      initialProps: newInitialProps,
    });

    await act(async () => {
      await result.current.onAddPress();
    });

    expect(checkForm).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(
      productListActions.updateList(newInitialProps.listParams),
    );
  });

  // when the handleDatePickerVisible is called with a status, should set that status in datePickerVisible
  test('ao chamar o handleDatePickerVisible passando o status, deve setar o status no datePickerVisible', () => {
    const { result } = renderHook(useNewList, { initialProps });

    expect(result.current.datePickerVisible).toBeFalsy();

    act(() => {
      result.current.handleDatePickerVisible(true);
    });

    expect(result.current.datePickerVisible).toBeTruthy();
  });

  // when the handleDatePickerVisible is called without status, should invert the datePickerVisible value
  test('ao chamar o handleDatePickerVisible sem passar o status, deve inverter o valor do datePickerVisible', () => {
    const { result } = renderHook(useNewList, { initialProps });

    expect(result.current.datePickerVisible).toBeFalsy();

    act(() => {
      result.current.handleDatePickerVisible();
    });

    expect(result.current.datePickerVisible).toBeTruthy();
  });
});
