import styled from 'styled-components/native';
import { dimensions, colors, fonts } from '@styles';

const Container = styled.ScrollView`
  padding: ${dimensions.spacing.inlineXxs};
  background-color: ${colors.list.neutralLight};
`;

const LoginContainer = styled.View`
  flex: 1;
`;

const LogoContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-top: ${dimensions.spacing.inlineXl};
  margin-bottom: ${dimensions.spacing.inlineXl};
`;
const Title = styled.Text`
  font-family: ${fonts.family.brandPrimary};
  text-align: center;
  font-size: ${fonts.size.fontSizeXxs};
  margin-left: ${dimensions.spacing.insetXxs};
  margin-right: ${dimensions.spacing.insetXxs};
`;

const InputContainer = styled.View`
  flex: 2;
  justify-content: flex-start;
`;

const SocialContainer = styled.View``;

export {
  Container,
  LoginContainer,
  LogoContainer,
  Title,
  InputContainer,
  SocialContainer,
};
