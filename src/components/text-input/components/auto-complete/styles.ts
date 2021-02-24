import styled from 'styled-components/native';

import { colors, dimensions } from '@styles';

export const Container = styled.View`
  width: 100%;
  position: absolute;
  z-index: 10;
  top: ${dimensions.size.Xl};
  border-bottom-left-radius: ${dimensions.border.radiusMd};
  max-height: ${dimensions.size.XXxl};
`;

interface ItemContainerProps {
  isLast: boolean;
}
export const ItemContainer = styled.TouchableOpacity<ItemContainerProps>`
  padding: ${dimensions.spacing.Md};
  background-color: ${colors.background};
  margin-left: ${dimensions.spacing.Sm};
  margin-right: ${dimensions.spacing.Sm};
  border-left-width: ${dimensions.border.widthThin};
  border-right-width: ${dimensions.border.widthThin};
  border-bottom-width: ${dimensions.border.widthThin};
  border-bottom-left-radius: ${({ isLast }) => isLast ? dimensions.border.radiusMd : dimensions.border.radiusNone}
  border-bottom-right-radius: ${({ isLast }) => isLast ? dimensions.border.radiusMd : dimensions.border.radiusNone}
  border-color: ${colors.placeholder};
`;

export const HasMoreContainer = styled(ItemContainer)`
  align-items: center;
  padding: ${dimensions.spacing.none};
`;

export const ItemText = styled.Text``;
