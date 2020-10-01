import React from 'react';
import { Paragraph as PaperParagraph } from 'react-native-paper';

interface Props {
  text: string;
}
const Paragraph = (props: Props) => {
  const { text } = props;
  return <PaperParagraph>{text}</PaperParagraph>;
};

export default Paragraph;
