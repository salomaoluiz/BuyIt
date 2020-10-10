import styled from 'styled-components/native';
import { dimensions } from '@styles';

export const ItemButton = styled.TouchableOpacity``;

export const ItemContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  border-width: 1px;
  padding: ${dimensions.spacing.Xxs};
  border-radius: ${dimensions.border.radiusXs};
  margin: ${dimensions.spacing.Xxs};
`;

export const ItemText = styled.Text``;
