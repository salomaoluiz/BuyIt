import { useCallback, useState, useEffect } from 'react';
import { Animated } from 'react-native';
import { animation } from '@styles';

interface Props {
  isFocused: boolean;
  hasPrefix?: boolean;
  hasValue?: boolean;
  startWithValue?: boolean;
  toPosition?: {
    left?: number;
    top?: number;
  };
}
const useAnimatedTitle = (props: Props) => {
  const { isFocused, hasPrefix, hasValue, startWithValue, toPosition } = props;
  const [titlePosition] = useState({
    top: new Animated.Value(0),
    left: new Animated.Value(0),
  });

  const handleAnimation = useCallback(
    (animate: Animated.Value, toValue: number, duration?: number) => {
      return Animated.timing(animate, {
        toValue: toValue,
        duration: duration || animation.duration.default,
        useNativeDriver: true,
      });
    },
    [isFocused],
  );

  useEffect(() => {
    const titlePositionTop = (toPosition && toPosition.top) || -25;
    const titlePositionLeft = (toPosition && toPosition.left) || -0;

    if (isFocused || startWithValue) {
      handleAnimation(titlePosition.top, titlePositionTop).start();
      if (hasPrefix)
        handleAnimation(
          titlePosition.left,
          titlePositionLeft,
          animation.duration.slow,
        ).start();
    } else if (!hasValue) {
      Animated.parallel([
        handleAnimation(titlePosition.top, 0, animation.duration.slow),
        handleAnimation(titlePosition.left, 0),
      ]).start();
    }
  }, [isFocused]);

  return {
    titlePosition,
  };
};

export default useAnimatedTitle;
