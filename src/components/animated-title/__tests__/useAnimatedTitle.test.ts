import { renderHook } from '@testing-library/react-hooks';
import useAnimatedTitle from '../useAnimatedTitle';
import { Animated } from 'react-native';

describe('testando o useAnimatedTitle', () => {
  let animatedTiming: jest.SpyInstance;
  beforeEach(() => {
    animatedTiming = jest
      .spyOn(Animated, 'timing')
      .mockReturnValue({ reset: jest.fn(), start: jest.fn(), stop: jest.fn() });
  });

  it('deve iniciar com os valores defaults', () => {
    const initialProps = {
      isFocused: false,
    };
    const { result } = renderHook(useAnimatedTitle, { initialProps });

    const mockTitlePosition = {
      left: new Animated.Value(0),
      top: new Animated.Value(0),
    };

    expect(result.current.titlePosition).toEqual(mockTitlePosition);
    expect(animatedTiming).toHaveBeenCalledTimes(2);

    const animatedCalls = [
      animatedTiming.mock.calls[0][1],
      animatedTiming.mock.calls[1][1],
    ];

    expect(animatedCalls[0].toValue).toEqual(0);
    expect(animatedCalls[1].toValue).toEqual(0);
  });

  it('se for focado o valor e possuir um prefixo, deve executar duas animações para movimentar o texto', () => {
    const initialProps = {
      isFocused: true,
      hasPrefix: true,
      toPosition: {
        top: -20,
        left: -10,
      },
    };
    const { result } = renderHook(useAnimatedTitle, { initialProps });

    const mockTitlePosition = {
      left: new Animated.Value(0),
      top: new Animated.Value(0),
    };

    expect(result.current.titlePosition).toEqual(mockTitlePosition);
    expect(animatedTiming).toHaveBeenCalledTimes(2);

    const animatedCalls = [
      animatedTiming.mock.calls[0][1],
      animatedTiming.mock.calls[1][1],
    ];

    expect(animatedCalls[0].toValue).toEqual(-20);
    expect(animatedCalls[1].toValue).toEqual(-10);
  });
});
