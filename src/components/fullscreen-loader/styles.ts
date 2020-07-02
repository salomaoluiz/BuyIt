import styled from 'styled-components/native';
import { dimensions, colors } from '@styles';

const Container = styled.View`
  height: ${dimensions.screenHeight}px;
  width: ${dimensions.screenWidth}px;
  background-color: ${colors.list.neutralLight};
  align-items: center;
  justify-content: center;
`;

export { Container };
