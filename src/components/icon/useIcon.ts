import { useState, useEffect, useCallback } from 'react';
import { Animated } from 'react-native';

import { animation } from '@styles';

import { Props } from './';

const useIcon = (props: Props) => {
  const { isVisible, onPress, useAnimation } = props;

  const initialValueAnimation = useAnimation ? 0 : 1;

  const [visibleAnimation] = useState(
    new Animated.Value(initialValueAnimation),
  );

  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  const handleAnimation = useCallback((isBlur?: boolean) => {
    const toValue = isBlur ? 0 : 1;

    Animated.timing(visibleAnimation, {
      toValue: toValue,
      duration: animation.duration.default,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    if (!useAnimation) return;
    if (useAnimation && isVisible) {
      handleAnimation();
      return;
    }

    handleAnimation(true);
  }, [isVisible]);

  return {
    handlePress,
    visibleAnimation,
  };
};

export default useIcon;
