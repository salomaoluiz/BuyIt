import styled from 'styled-components/native';

import { dimensions } from '@styles';

export const Container = styled.View`
  flex: 1;
`;

export const ButtonContainer = styled.KeyboardAvoidingView`
  position: absolute;
  right: ${dimensions.spacing.Xl};
  bottom: ${dimensions.spacing.Xl};
`;
