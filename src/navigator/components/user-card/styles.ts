import styled from 'styled-components/native';

import { dimensions } from '@styles';

export const Container = styled.View`
  padding: ${dimensions.spacing.Md};
  top: -4px;
`;

export const UnauthorizedText = styled.Text`
  align-self: center;
`;

export const UnauthorizedButton = styled.TouchableNativeFeedback``;

export const UserContainer = styled.View`
  flex-direction: row;
`;

export const UserName = styled.Text``;
