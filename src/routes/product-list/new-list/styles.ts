import styled from 'styled-components/native';

import { dimensions } from '@styles';

export const Container = styled.View`
  padding: ${dimensions.spacing.Xs};
  flex: 1;
`;

export const SubContainer = styled.ScrollView``;

export const TwoColumnsContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

export const ButtonContainer = styled.KeyboardAvoidingView`
  position: absolute;
  right: ${dimensions.spacing.Xl};
  bottom: ${dimensions.spacing.Xl};
  z-index: 10;
`;
