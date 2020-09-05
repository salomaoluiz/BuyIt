import styled from 'styled-components/native';

import { dimensions } from '@styles';

const Container = styled.ScrollView`
  padding: ${dimensions.size.stackXxxs};
`;

const SubContainer = styled.View`
  align-items: stretch;
  justify-content: center;
`;

const TwoColumnsContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

const TextInput = styled.TextInput`
  margin-bottom: ${dimensions.size.stackXxs};
  border-width: ${dimensions.border.widthMedium};
  border-radius: ${dimensions.border.radiusSm};
  padding: ${dimensions.spacing.inlineXs};
`;

export const ButtonContainer = styled.KeyboardAvoidingView`
  position: absolute;
  right: ${dimensions.spacing.inlineMd};
  bottom: ${dimensions.spacing.inlineMd};
`;

export { TwoColumnsContainer, Container, TextInput, SubContainer };
