import React from 'react';

import { PrefixContainer, PrefixText } from './styles';

interface Props {
  value?: string;
  color?: string;
}

const Prefix = (props: Props) => {
  const { value, color } = props;

  if (!value) return null;

  return (
    <PrefixContainer>
      <PrefixText color={color}>{value}</PrefixText>
    </PrefixContainer>
  );
};

export default Prefix;
