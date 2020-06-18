import { renderHook, act } from '@testing-library/react-hooks';
import useDropdownMenu from '../useDropdownMenu';
import { Keyboard } from 'react-native';

describe('Testando o useDropdownMenu', () => {
  let dismissKeyboard: jest.SpyInstance;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mockButtonEvent: any = {
    nativeEvent: {
      pageY: 30,
      pageX: 20,
    },
  };

  beforeEach(() => {
    dismissKeyboard = jest.spyOn(Keyboard, 'dismiss');
  });

  it('deve iniciar com o modal não visível', () => {
    const { result } = renderHook(useDropdownMenu);

    expect(result.current.modalVisible).toEqual(false);
  });

  it('deve ocultar o teclado, exibir o modal e iniciar a animação de abertura', () => {
    const { result } = renderHook(useDropdownMenu);

    act(() => result.current.onModalButtonPress(mockButtonEvent));

    expect(dismissKeyboard).toHaveBeenCalledTimes(1);
  });

  it('ao ser chamado 2x deve iniciar a animação de fechamento e ao fim ocultar o modal', () => {
    const { result } = renderHook(useDropdownMenu);

    act(() => result.current.onModalButtonPress(mockButtonEvent));
    act(() => result.current.onModalButtonPress(mockButtonEvent));

    expect(dismissKeyboard).toHaveBeenCalledTimes(2);
  });
});
