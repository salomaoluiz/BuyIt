import React from 'react';

import { TitleText } from './styles';
import useAnimatedTitle from './useAnimatedTitle';

interface Props {
  title?: string;
  hasPrefix?: boolean;
  hasValue?: boolean;
  isError?: boolean;
  isFocused: boolean;
  startWithValue?: boolean;
  toPosition?: { left?: number; top?: number };
}

const AnimatedTitle = (props: Props) => {
  const { title, isError, isFocused, hasPrefix } = props;

  const { titlePosition } = useAnimatedTitle(props);
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
      {title}
    </TitleText>
  );
};

export default AnimatedTitle;
