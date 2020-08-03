import styled from 'styled-components/native';
import { dimensions, fonts, colors } from '@styles';

export const Container = styled.View`
  padding: ${dimensions.spacing.inlineXs};
  background-color: ${colors.list.brandPrimaryMedium};
  top: -4px;
`;

export const UnauthorizedText = styled.Text`
  align-self: center;
  font-size: ${fonts.size.fontSizeXxs};
`;

export const UnauthorizedButton = styled.TouchableNativeFeedback``;

export const UserContainer = styled.View`
  flex-direction: row;
`;

export const UserName = styled.Text``;
