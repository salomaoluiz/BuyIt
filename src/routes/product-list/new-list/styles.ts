import styled from 'styled-components/native';

import { dimensions } from '@styles';

export const Container = styled.View`
  padding: ${dimensions.size.stackXxxs};
  flex: 1;
`;

export const SubContainer = styled.ScrollView``;

export const TwoColumnsContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

export const TextInput = styled.TextInput`
  margin-bottom: ${dimensions.size.stackXxs};
  border-width: ${dimensions.border.widthMedium};
  border-radius: ${dimensions.border.radiusSm};
  padding: ${dimensions.spacing.inlineXs};
`;

export const ButtonContainer = styled.KeyboardAvoidingView`
  position: absolute;
  right: ${dimensions.spacing.inlineMd};
  bottom: ${dimensions.spacing.inlineMd};
  z-index: 10
`;