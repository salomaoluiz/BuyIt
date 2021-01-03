import React from 'react';
import { ScrollView, ViewStyle } from 'react-native';
import { Surface as PaperSurface } from 'react-native-paper';

interface Props {
  children: JSX.Element;
  style?: ViewStyle;
  hasScroll?: boolean;
}
const Surface = (props: Props) => {
  const injectScroll = () => {
    if (props.hasScroll) return <ScrollView>{props.children}</ScrollView>;

    return props.children;
  };

  return <PaperSurface style={props.style}>{injectScroll()}</PaperSurface>;
};

export default Surface;
