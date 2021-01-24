import { act, renderHook } from '@testing-library/react-hooks';

import { Props } from '../index';
import useDateTimePicker from '../useDateTimePicker';

describe('Components - useDateTimePicker', () => {
  const initialProps: Props = {
    getDateTime: jest.fn(),
    handleModalVisible: jest.fn(),
    isVisible: false,
    mode: 'date',
    minimumDate: undefined,
    value: undefined,
  };

  beforeAll(() => {
    jest.spyOn(Date, 'now').mockReturnValue(1604012169142);
  });

  // if hasn't the props minimumDate and value, should initialize with the default value
  test('caso nao tenha os props minimumDate e value, deve inicializar com os valoes default', () => {
    const { result } = renderHook(useDateTimePicker, { initialProps });

    expect(result.current.value).toEqual(new Date(Date.now()));
    expect(result.current.minimumDate).toEqual(undefined);
  });

  // if has the props minimumDate and value, should initialize with they setted
  test('caso tenha os props minimumDate e value, deve inicializar com eles setados', () => {
    const newInitialProps = {
      ...initialProps,
      value: 1604012121111,
      minimumDate: 1604012120000,
    };

    const { result } = renderHook(useDateTimePicker, {
      initialProps: newInitialProps,
    });

    expect(result.current.value).toEqual(new Date(1604012121111));
    expect(result.current.minimumDate).toEqual(new Date(1604012120000));
  });

  // if has a date change, should close the modal and set the date with a numeric value
  test('caso realize uma alteração na data, deve fechar o modal e setar a data de modo numérico', () => {
    const { result } = renderHook(useDateTimePicker, { initialProps });

    const event = {} as any;
    act(() => {
      result.current.handleChange(event, new Date(Date.now()));
    });

    expect(initialProps.handleModalVisible).toHaveBeenCalledWith(false);

    expect(initialProps.getDateTime).toHaveBeenCalledWith(1604012169142);
  });
});
