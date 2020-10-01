import React from 'react';
import { Title as PaperTitle } from 'react-native-paper';

interface Props {
  text: string;
  alignCenter?: boolean;
}

const Title = (props: Props) => {
  const { text, alignCenter } = props;
  return (
    <PaperTitle style={{ textAlign: alignCenter ? 'center' : 'auto' }}>
      {text}
    </PaperTitle>
  );
};

export default Title;
