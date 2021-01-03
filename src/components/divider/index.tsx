import React from 'react';
import { Divider as PaperDivider } from 'react-native-paper';

import { Container } from './styles';

interface Props {
  rowDivider?: boolean;
  columnDivider?: boolean;
  showHorizontalDivider?: boolean;
  halfSize?: boolean;
}
const Divider = (props: Props) => {
  const { rowDivider, columnDivider, showHorizontalDivider, halfSize } = props;

  return (
    <Container
      rowDivider={rowDivider}
      columnDivider={columnDivider}
      halfSize={halfSize}>
      {showHorizontalDivider && <PaperDivider />}
    </Container>
  );
};

export default Divider;
