import React from 'react';

import { Animated } from 'react-native';
import { TitleText } from './styles';

interface Props {
  value: string;
  hasPrefix: boolean;
  titlePosition: { top: Animated.Value; left: Animated.Value };
  isError?: boolean;
  isFocused: boolean;
}
const Title = (props: Props) => {
  const { value, isError, isFocused, hasPrefix, titlePosition } = props;

  return (
    <TitleText
      isError={isError}
      isFocused={isFocused}
      style={{
        transform: [
          { translateY: titlePosition.top },
          { translateX: titlePosition.left },
        ],
      }}
      hasPrefix={hasPrefix}>
      {value}
    </TitleText>
  );
};

export default Title;
