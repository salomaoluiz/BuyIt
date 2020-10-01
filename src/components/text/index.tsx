import React from 'react';
import { Text as PaperText } from 'react-native-paper';

interface Props {
  text: string;
}

const Text = (props: Props) => {
  const { text } = props;

  return <PaperText>{text}</PaperText>;
};

export default Text;
