import styled from 'styled-components/native';

import { dimensions } from '@styles';
import theme from 'src/styles/theme';

const Container = styled.View``;

const SubContainer = styled.View`
  padding: ${dimensions.spacing.Xs};
  border-top-left-radius: ${dimensions.border.radiusMd};
  border-top-right-radius: ${dimensions.border.radiusMd};
  background-color: ${theme.colors.surface};
`;

const ButtonContainer = styled.View`
  align-self: center;
  position: absolute;
  bottom: ${dimensions.spacing.Xl};
  z-index: 10;
`;

const TextContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;

const TextSubContainer = styled.View`
  align-items: center;
`;

const Title = styled.Text``;

const Value = styled.Text``;

export {
  ButtonContainer,
  SubContainer,
  Container,
  TextContainer,
  TextSubContainer,
  Title,
  Value,
};
