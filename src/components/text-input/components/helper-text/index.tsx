import React from 'react';
import { HelperContainer, HelperText } from './styles';

interface Props {
  value?: string;
  isError?: boolean;
  hasIcon: boolean;
}
const HelperComponent = (props: Props) => {
  const { value, isError, hasIcon } = props;
  if (!value) return null;

  return (
    <HelperContainer hasIcon={hasIcon}>
      <HelperText isError={isError}>{value}</HelperText>
    </HelperContainer>
  );
};

export default HelperComponent;
