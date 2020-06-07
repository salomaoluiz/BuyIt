import styled from 'styled-components/native';

import { dimensions } from '@styles';

const Container = styled.View`
  padding: ${dimensions.size.stackXxxs};
  flex: 1;
  justify-content: space-between;
`;

const InputContainer = styled.View``;

const TextInput = styled.TextInput`
  margin-bottom: ${dimensions.size.stackXxs};
  border-width: ${dimensions.border.widthMedium};
  border-radius: ${dimensions.border.radiusSm};
  padding: ${dimensions.spacing.inlineXs};
`;

const Button = styled.Button``;

export { Container, TextInput, InputContainer, Button };
