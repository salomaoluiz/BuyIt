import React from 'react';
import { Subheading as PaperSubheading } from 'react-native-paper';

interface Props {
  text: string;
}

const Subheading = (props: Props) => {
  const { text } = props;

  return <PaperSubheading>{text}</PaperSubheading>;
};

export default Subheading;
