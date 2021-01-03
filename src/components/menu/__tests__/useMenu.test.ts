import { act, renderHook } from '@testing-library/react-hooks';

import useMenu from '../useMenu';

describe('useMenu', () => {
  test('deve abrir o menu e fecha-lo novamente', () => {
    const { result } = renderHook(useMenu);

    expect(result.current.visible).toEqual(false);
    act(() => {
      result.current.handleOpenMenu();
    });
    expect(result.current.visible).toEqual(true);
    act(() => {
      result.current.handleCloseMenu();
    });
    expect(result.current.visible).toEqual(false);
  });

  test('ao pressionar o item, deve fechar o menu e chamar o callback', () => {
    const { result } = renderHook(useMenu);

    const callback = jest.fn();

    expect(result.current.visible).toEqual(false);
    act(() => {
      result.current.handleOpenMenu();
    });
    expect(result.current.visible).toEqual(true);

    act(() => {
      const func = result.current.handleItemPress(callback);
      func();
    });

    expect(result.current.visible).toEqual(false);
    expect(callback).toHaveBeenCalled();
  });
});
