import { dimensions } from '@styles';
import styled from 'styled-components/native';

interface ContainerProps {
  rowDivider?: boolean;
  columnDivider?: boolean;
}
export const Container = styled.View<ContainerProps>`
  margin-left: ${({ rowDivider }) => (rowDivider ? dimensions.spacing.Sm : 0)};
  margin-right: ${({ rowDivider }) => (rowDivider ? dimensions.spacing.Sm : 0)};
  margin-top: ${({ columnDivider }) =>
    columnDivider ? dimensions.spacing.Sm : 0};
  margin-bottom: ${({ columnDivider }) =>
    columnDivider ? dimensions.spacing.Sm : 0};
`;
