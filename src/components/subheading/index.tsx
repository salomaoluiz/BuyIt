import React from 'react';
import { TextStyle } from 'react-native';
import { Subheading as PaperSubheading } from 'react-native-paper';

interface Props {
  text: string;
  style?: TextStyle;
}

const Subheading = (props: Props) => {
  const { text, style } = props;

  return <PaperSubheading style={style}>{text}</PaperSubheading>;
};

export default Subheading;
