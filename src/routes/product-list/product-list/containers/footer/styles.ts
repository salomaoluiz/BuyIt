import styled from 'styled-components/native';
import { dimensions, fonts, colors } from '@styles';

const Container = styled.View`
  border-top-left-radius: ${dimensions.border.radiusMd};
  border-top-right-radius: ${dimensions.border.radiusMd};
  padding-top: ${dimensions.spacing.inlineMd};
`;
const SubContainer = styled.View`
  padding: ${dimensions.spacing.inlineXxs};
  background-color: ${colors.list.neutralLightest};
`;

const ButtonContainer = styled.View`
  align-self: center;
  position: absolute;
  bottom: ${dimensions.spacing.inlineMd};
`;

const TextContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;

const TextSubContainer = styled.View`
  align-items: center;
`;

const Title = styled.Text`
  font-size: ${fonts.size.fontSizeXs};
`;

const Value = styled.Text`
  font-size: ${fonts.size.fontSizeXxs};
`;

export {
	ButtonContainer,
	SubContainer,
	Container,
	TextContainer,
	TextSubContainer,
	Title,
	Value,
};
