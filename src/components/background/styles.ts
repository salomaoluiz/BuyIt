import styled from 'styled-components/native';
import { colors } from '@styles';

interface BackgroundContainerProps {
  color?: string;
}
const BackgroundContainer = styled.View<BackgroundContainerProps>`
  background-color: ${({ color }) => color || colors.list.neutralLight};
  flex: 1;
`;

export { BackgroundContainer };
