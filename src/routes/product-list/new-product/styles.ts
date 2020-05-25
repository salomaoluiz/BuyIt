import styled from 'styled-components/native';

import { dimensions } from '@styles';

const Container = styled.View`
  padding: ${dimensions.spacing.medium};
  flex: 1;
  justify-content: space-between;
`;

const InputContainer = styled.View``;

const TextInput = styled.TextInput`
  margin: ${dimensions.spacing.small};
  border-width: ${dimensions.lineWeight.hairLine};
  border-radius: ${dimensions.radius.regular};
  padding: ${dimensions.spacing.medium};
`;

const Button = styled.Button``;

export { Container, TextInput, InputContainer, Button };
