import { renderHook, act } from '@testing-library/react-hooks';
import useIcon from '../useIcon';
import { Animated } from 'react-native';

describe('Testando useIcon', () => {
  const initialProps = {
    isVisible: false,
    name: 'icon',
    onPress: jest.fn(),
    useAnimation: false,
  };
  let mockAnimatedTiming: jest.SpyInstance;

  beforeEach(() => {
    mockAnimatedTiming = jest
      .spyOn(Animated, 'timing')
      .mockReturnValue({ start: jest.fn(), stop: jest.fn() });
  });

  it('deve retornar o onPress corretamente', () => {
    const { result } = renderHook(useIcon, { initialProps });

    act(() => result.current.handlePress());

    expect(initialProps.onPress).toHaveBeenCalledTimes(1);
  });

  it('deve chamar a animacao para o icone aparecer', () => {
    const mockInitialProps = {
      ...initialProps,
      useAnimation: true,
      isVisible: true,
    };

    renderHook(useIcon, { initialProps: mockInitialProps });

    const firstAnimatedValue = mockAnimatedTiming.mock.calls[0][1].toValue;

    const iconScale = 1;
    expect(firstAnimatedValue).toEqual(iconScale);
  });

  it('não deve chamar a animacao se useAnimation for false', () => {
    const mockInitialProps = {
      ...initialProps,
      useAnimation: false,
    };

    renderHook(useIcon, { initialProps: mockInitialProps });

    expect(mockAnimatedTiming).not.toHaveBeenCalled();
  });

  it('deve chamar a animacao para o icone sumir', () => {
    const mockInitialProps = {
      ...initialProps,
      useAnimation: true,
      isVisible: false,
    };

    renderHook(useIcon, { initialProps: mockInitialProps });

    const firstAnimatedValue = mockAnimatedTiming.mock.calls[0][1].toValue;

    const iconScale = 0;

    expect(firstAnimatedValue).toEqual(iconScale);
  });
});
