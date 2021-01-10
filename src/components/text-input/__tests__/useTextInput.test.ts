import { renderHook, act } from '@testing-library/react-hooks';

import useTextInput from '../useTextInput';

describe('Testando useTextInput', () => {
  const initialProps = {
    onChangeText: jest.fn(),
    value: '',
    label: 'title',
  };

  test('deve alterar o isFocused', () => {
    const { result } = renderHook(useTextInput, { initialProps });

    act(() => result.current.handleFocusStatus());

    expect(result.current.isFocused).toEqual(true);
  });

  test('deve alterar o valor do text e limpa ele novamente', () => {
    const mockValue = 'mock value';

    const { result } = renderHook(useTextInput, {
      initialProps: { ...initialProps, value: mockValue },
    });

    act(() => result.current.onClearText());

    expect(initialProps.onChangeText).toHaveBeenCalledWith('');
  });

  test('nao deve alterar nada caso nao possua o onChangeText', () => {
    const mockValue = 'mock value';

    const { result } = renderHook(useTextInput, {
      initialProps: { value: mockValue, label: 'label' },
    });

    act(() => {
      result.current.onClearText();
    });

    expect(initialProps.onChangeText).not.toHaveBeenCalled();
  });
});
