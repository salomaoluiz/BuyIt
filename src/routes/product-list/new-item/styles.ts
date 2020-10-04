import styled from 'styled-components/native';

import { dimensions } from '@styles';

const Container = styled.ScrollView`
  padding: ${dimensions.spacing.Xs};
`;

const SubContainer = styled.View`
  align-items: stretch;
  justify-content: center;
`;

const TwoColumnsContainer = styled.View`
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
`;

export const ButtonContainer = styled.KeyboardAvoidingView`
  position: absolute;
  right: ${dimensions.spacing.Xl};
  bottom: ${dimensions.spacing.Xl};
`;

export { TwoColumnsContainer, Container, SubContainer };
