import React from 'react';
import { HelperText as PaperHelperText } from 'react-native-paper';

interface Props {
  value?: string;
  isError?: boolean;
}
const HelperComponent = (props: Props) => {
  const { value, isError } = props;
  if (!value) return null;

  const type = isError ? 'error' : 'info';
  
  return <PaperHelperText type={type}>{value}</PaperHelperText>;
};

export default HelperComponent;
