import styled from 'styled-components/native';

import NativeTitle from '@components/subheading';
import NativeText from '@components/text';
import { colors, dimensions } from '@styles';
import theme from 'src/styles/theme';

export const ItemButton = styled.TouchableOpacity`
  flex: 1;
`;

export const ItemContainer = styled.View`
  flex-direction: row;
  padding-top: ${dimensions.spacing.Xs};
  padding-bottom: ${dimensions.spacing.Xs};
  padding-left: ${dimensions.spacing.Sm};
  padding-right: ${dimensions.spacing.Sm};
  height: ${dimensions.size.Xxl};
  background-color: ${colors.surface};
  align-items: center;
  border-radius: ${dimensions.border.radiusXs};
`;

export const IconContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  min-height: ${dimensions.size.Xl};
`;

export const ItemSubContainer = styled.View`
  flex-direction: row;
`;

export const TextsContainer = styled.View`
  flex: 6;
  justify-content: space-between;
`;

export const TopContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Title = styled(NativeTitle)``;
export const Brand = styled(NativeText)`
  opacity: ${theme.emphasis.disabled};
`;

export const AmountContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const SubTotal = styled(NativeTitle)``;
export const Price = styled(NativeText)``;
