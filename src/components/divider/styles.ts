import styled from 'styled-components/native';

import { dimensions, getStyleAsNumber } from '@styles';

interface ContainerProps {
  rowDivider?: boolean;
  columnDivider?: boolean;
  halfSize?: boolean;
}

export const _setSpacing = (divider?: boolean, halfSize?: boolean) => {
  const spacing = getStyleAsNumber(dimensions.spacing.Sm);

  if (divider) {
    if (halfSize) {
      return `${spacing / 2}px`;
    }
    return `${spacing}px`;
  }

  return `0px`;
};

export const Container = styled.View<ContainerProps>`
  margin-left: ${({ rowDivider, halfSize }) =>
    _setSpacing(rowDivider, halfSize)};
  margin-right: ${({ rowDivider, halfSize }) =>
    _setSpacing(rowDivider, halfSize)};
  margin-top: ${({ columnDivider, halfSize }) =>
    _setSpacing(columnDivider, halfSize)};
  margin-bottom: ${({ columnDivider, halfSize }) =>
    _setSpacing(columnDivider, halfSize)};
`;
