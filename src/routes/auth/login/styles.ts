import styled from 'styled-components/native';

import { dimensions } from '@styles';

const Container = styled.ScrollView`
  padding: ${dimensions.spacing.Xs};
`;

const LoginContainer = styled.View`
  flex: 1;
`;

const LogoContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-top: ${dimensions.spacing.Xll};
  margin-bottom: ${dimensions.spacing.Xll};
`;

const InputContainer = styled.View`
  min-width: ${dimensions.screenWidth / 1.5}px;
  
`;

const SocialContainer = styled.View`
  min-width: ${dimensions.screenWidth / 1.5}px;
  align-self: center;
  justify-content: flex-start;
`;

export {
  Container,
  LoginContainer,
  LogoContainer,
  InputContainer,
  SocialContainer,
};
