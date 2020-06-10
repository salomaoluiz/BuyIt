import { renderHook } from '@testing-library/react-hooks';
import useAnimations from '../useAnimations';
import { Animated } from 'react-native';

describe('Testando useAnimations', () => {
  const initialProps = {
    isFocused: false,
    hasPrefix: false,
    hasValue: false,
    startWithValue: false,
  };
  const mockStartAnimation = jest.fn();
  let mockedAnimatedParallel: jest.SpyInstance;
  let mockedAnimatedTiming: jest.SpyInstance;

  beforeEach(() => {
    mockedAnimatedTiming = jest
      .spyOn(Animated, 'timing')
      .mockReturnValue({
        start: mockStartAnimation,
        stop: jest.fn(),
        reset: jest.fn(),
      });

    mockedAnimatedParallel = jest
      .spyOn(Animated, 'parallel')
      .mockReturnValue({
        start: mockStartAnimation,
        stop: jest.fn(),
        reset: jest.fn(),
      });
  });

  it('deve iniciar com valores default as animacoes ', () => {
    const { result } = renderHook(useAnimations, { initialProps });

    const animationMock = {
      top: new Animated.Value(0),
      left: new Animated.Value(0),
    };

    expect(result.current.titlePosition).toEqual(animationMock);
  });

  it('deve inicializar a animacao timing 2x com o prefixo', async () => {
    const mockInitialProps = {
      isFocused: true,
      hasPrefix: true,
      hasValue: false,
      startWithValue: false,
    };
    renderHook(useAnimations, {
      initialProps: mockInitialProps,
    });

    expect(mockStartAnimation).toHaveBeenCalledTimes(2);

    const firstCallValue = mockedAnimatedTiming.mock.calls[0][1].toValue;
    expect(firstCallValue).toEqual(-25);

    const secondCallValue = mockedAnimatedTiming.mock.calls[1][1].toValue;
    expect(secondCallValue).toEqual(-20);
  });

  it('deve inicializar a animacao timing 2x paralelamente quando nao esta focado', async () => {
    const mockInitialProps = {
      isFocused: false,
      hasPrefix: true,
      hasValue: false,
      startWithValue: false,
    };

    renderHook(useAnimations, {
      initialProps: mockInitialProps,
    });

    expect(mockedAnimatedParallel).toHaveBeenCalledTimes(1);
    expect(mockedAnimatedTiming).toHaveBeenCalledTimes(2);

    const firstCallValue = mockedAnimatedTiming.mock.calls[0][1].toValue;
    expect(firstCallValue).toEqual(0);

    const secondCallValue = mockedAnimatedTiming.mock.calls[1][1].toValue;
    expect(secondCallValue).toEqual(0);
  });
});
