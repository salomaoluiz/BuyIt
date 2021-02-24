import { act, renderHook } from '@testing-library/react-hooks';
import { Keyboard } from 'react-native';

import { Props } from '../';
import useAutoComplete from '../useAutoComplete';

describe('useAutoComplete', () => {
  const initialProps: Props = {
    data: [{ id: 'id1', label: 'label1' }],
  };

  const remove = jest.fn();

  const spyAddListener = jest
    .spyOn(Keyboard, 'addListener')
    // @ts-ignore
    .mockReturnValue({ remove });
  const spyDismiss = jest.spyOn(Keyboard, 'dismiss');

  // should start with the component closed
  test('deve inicializar com o componente fechado', () => {
    const { result } = renderHook(useAutoComplete, { initialProps });

    expect(result.current.isVisible).toBeFalsy();
  });

  // on mount should add the keyboard listeners
  test('ao inicializar deve adicionar os listeners do teclado', () => {
    renderHook(useAutoComplete, { initialProps });

    expect(spyAddListener).toHaveBeenCalledTimes(2);
    expect(spyAddListener).toHaveBeenCalledWith(
      'keyboardDidShow',
      expect.any(Function),
    );
    expect(spyAddListener).toHaveBeenCalledWith(
      'keyboardDidHide',
      expect.any(Function),
    );
  });

  // on call the functions to show and dismiss the keyboard, they should do that
  test('ao chamar as funções de mostrar e fechar o keyboard, elas devem fazer isso', () => {
    const { result } = renderHook(useAutoComplete, { initialProps });

    expect(result.current._isKeyboardVisible).toBeFalsy();

    act(() => {
      result.current._showKeyboard();
    });
    expect(result.current._isKeyboardVisible).toBeTruthy();

    act(() => {
      result.current._dismissKeyboard();
    });
    expect(result.current._isKeyboardVisible).toBeFalsy();
  });

  // on unmount should remove all listeners
  test('ao desmontar deve remover os listeners', () => {
    const { unmount } = renderHook(useAutoComplete, { initialProps });

    unmount();
    expect(remove).toHaveBeenCalledTimes(2);
  });

  // if don't has the props onItemPress, on press the item should do nothing
  test('caso nao possua a props onItemPress, ao pressionar o item não deve fazer nada', () => {
    const { result } = renderHook(useAutoComplete, { initialProps });

    act(() => {
      result.current.handleItemPress({ id: 'id2', label: 'label2' });
    });

    expect(spyDismiss).not.toHaveBeenCalled();
  });

  // on press a item, should send that item by props, close the auto complete and the keyboard
  test('ao pressionar um item deve enviar esse item pela props, fechar o Auto Complete e o teclado', () => {
    const onItemPress = jest.fn();
    const { result } = renderHook(useAutoComplete, {
      initialProps: { ...initialProps, onItemPress },
    });

    act(() => {
      result.current.handleItemPress({ id: 'id2', label: 'label2' });
    });

    expect(onItemPress).toHaveBeenCalledWith({ id: 'id2', label: 'label2' });
    expect(result.current.isVisible).toBeFalsy();
    expect(spyDismiss).toHaveBeenCalled();
  });

  // if the keyboard isn't visible, should not show the auto complete
  test('caso o teclado nao esteja visivel, não deve mostrar o auto complete', () => {
    const { result } = renderHook(useAutoComplete, { initialProps });

    act(() => {
      result.current._setKeyboardVisible(true);
    });

    expect(result.current.isVisible).toBeTruthy();

    act(() => {
      result.current._setKeyboardVisible(false);
    });
    expect(result.current.isVisible).toBeFalsy();
  });

  // if the data hasn't elements, should not show the auto complete, even with the keyboard open
  test('caso o data nao tenha elementos, nao deve mostrar o auto complete, mesmo com o teclado aberto', () => {
    const { result } = renderHook(useAutoComplete, {
      initialProps: { data: [] },
    });

    act(() => {
      result.current._setKeyboardVisible(true);
    });

    expect(result.current.isVisible).toBeFalsy();
  });
});
