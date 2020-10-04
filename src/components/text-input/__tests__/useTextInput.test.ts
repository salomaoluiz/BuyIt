import { renderHook, act } from '@testing-library/react-hooks';
import useTextInput from '../useTextInput';

describe('Testando useTextInput', () => {
  const initialProps = {
    onChangeText: jest.fn(),
    value: '',
    label: 'title',
  };

  it('deve iniciar com os valores defaults', () => {
    const { result } = renderHook(useTextInput, { initialProps });

    expect(result.current.isFocused).toEqual(false);
    expect(result.current.value).toEqual('');
  });

  it('deve alterar o isFocused', () => {
    const { result } = renderHook(useTextInput, { initialProps });

    act(() => result.current.handleFocusStatus());

    expect(result.current.isFocused).toEqual(true);
  });

  it('deve alterar o valor do text e limpa ele novamente', () => {
    const { result } = renderHook(useTextInput, { initialProps });

    const mockValue = 'mock value';
    act(() => result.current.onChangeText(mockValue));

    expect(result.current.value).toEqual(mockValue);
    expect(initialProps.onChangeText).toHaveBeenCalledWith(mockValue);

    act(() => result.current.onClearText());

    expect(result.current.value).toEqual(initialProps.value);
    expect(initialProps.onChangeText).toHaveBeenCalledWith('');
  });
});
