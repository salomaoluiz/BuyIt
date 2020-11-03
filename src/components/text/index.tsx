import React from 'react';
import { TextStyle } from 'react-native';
import { Text as PaperText } from 'react-native-paper';

interface Props {
  text: string;
  style?: TextStyle;
}

const Text = (props: Props) => {
  const { text, style } = props;

  return <PaperText style={style}>{text}</PaperText>;
};

export default Text;
