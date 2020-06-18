import styled from 'styled-components/native';
import { dimensions, colors } from '@styles';

interface ContainerProps {
  cordsXY?: { X?: number; Y?: number };
}
const Container = styled.View<ContainerProps>`
  background-color: ${colors.list.neutralLight};
  border-radius: ${dimensions.border.radiusMd};
  elevation: ${dimensions.border.elevation};
  position: absolute;
  width: ${dimensions.size.stackXXxl};
  min-height: ${dimensions.size.stackXXxl};
  max-height: ${dimensions.screenHeight / 2}px;
  top: ${({ cordsXY }) =>
    cordsXY && cordsXY.Y ? `${cordsXY.Y}px` : 0};
  left: ${({ cordsXY }) =>
    cordsXY && cordsXY.X ? `${cordsXY.X}px` : 0};
`;

const ModalBackground = styled.TouchableOpacity`
  flex: 1;
  background-color: ${colors.list.neutralDarkest};
  opacity: ${colors.opacity.medium};
`;

export { Container, ModalBackground };
