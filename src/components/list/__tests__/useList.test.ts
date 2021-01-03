import { act, renderHook } from '@testing-library/react-hooks';

import { Props } from '../';
import useList from '../useList';

describe('testando useList', () => {
  test('ao receber uma lista de selectedItems, deve retornar um data informando quais os elementos estão selecionados', () => {
    const initialProps: Props = {
      data: [
        { id: '111', title: 'title1' },
        { id: '222', title: 'title2' },
        { id: '333', title: 'title3' },
        { id: '444', title: 'title4' },
        { id: '555', title: 'title5' },
        { id: '777', title: 'title7' },
      ],
      onPress: jest.fn(),
      selectedItems: [
        { id: '111', title: 'title1' },
        { id: '222', title: 'title2' },
        { id: '777', title: 'title7' },
      ],
    };
    const { result } = renderHook(useList, { initialProps });

    expect(result.current.data).toEqual([
      { id: '111', title: 'title1', isSelected: true },
      { id: '222', title: 'title2', isSelected: true },
      { id: '333', title: 'title3' },
      { id: '444', title: 'title4' },
      { id: '555', title: 'title5' },
      { id: '777', title: 'title7', isSelected: true },
    ]);
  });

  test('ao receber uma lista sem items selecionados deve retornar a lista default', () => {
    const initialProps: Props = {
      data: [
        { id: '111', title: 'title1' },
        { id: '222', title: 'title2' },
        { id: '333', title: 'title3' },
        { id: '444', title: 'title4' },
        { id: '555', title: 'title5' },
        { id: '777', title: 'title7' },
      ],
      onPress: jest.fn(),
      selectedItems: [],
    };
    const { result } = renderHook(useList, { initialProps });

    expect(result.current.data).toEqual([
      { id: '111', title: 'title1' },
      { id: '222', title: 'title2' },
      { id: '333', title: 'title3' },
      { id: '444', title: 'title4' },
      { id: '555', title: 'title5' },
      { id: '777', title: 'title7' },
    ]);
  });

  test('se nao puder selecionar multiplos, deve retornar um array com um elemento apenas ao chamar onPress', () => {
    const initialProps: Props = {
      data: [
        { id: '111', title: 'title1' },
        { id: '222', title: 'title2' },
        { id: '333', title: 'title3' },
      ],
      onPress: jest.fn(),
      selectedItems: [],
      checkMode: 'radiobutton',
    };
    const { result } = renderHook(useList, { initialProps });

    const itemPressed = { id: '333', title: 'title3' };
    act(() => {
      result.current.handleItemPress(itemPressed);
    });

    expect(initialProps.onPress).toHaveBeenCalledWith([
      { id: '333', title: 'title3' },
    ]);
  });

  test('se puder selecionar multiplos elementos, deve retornar um array com todos items selecionados ao chamar onPress', () => {
    const initialProps: Props = {
      data: [
        { id: '111', title: 'title1' },
        { id: '222', title: 'title2' },
        { id: '333', title: 'title3' },
        { id: '444', title: 'title4' },
        { id: '555', title: 'title5' },
      ],
      onPress: jest.fn(),
      selectedItems: [{ id: '111', title: 'title1' }],
      checkMode: 'checkbox',
    };
    const { result } = renderHook(useList, { initialProps });

    const itemPressed = { id: '555', title: 'title5' };
    act(() => {
      result.current.handleItemPress(itemPressed);
    });

    const expected = [
      { id: '111', title: 'title1', isSelected: true },
      { id: '555', title: 'title5', isSelected: true },
    ];
    expect(initialProps.onPress).toHaveBeenCalledWith(expected);
  });
});
