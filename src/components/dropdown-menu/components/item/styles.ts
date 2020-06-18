import styled from 'styled-components/native';
import { dimensions, fonts, colors } from '@styles';

export const Container = styled.ScrollView``;

interface ListContainerProps {
  isFirst?: boolean;
  isSelected?: boolean;
  isLast?: boolean;
}

export const ListContainer = styled.TouchableOpacity<ListContainerProps>`
  flex-direction: row;
  align-self: center;
  justify-content: space-around;
  padding: ${dimensions.spacing.inlineXs};
  border-bottom-width: 1px;
  border-color: ${colors.list.neutralDark};
  flex: 1;
  border-left-width: ${({ isSelected }) =>
    isSelected ? dimensions.border.widthThick : dimensions.border.widthNone};
  border-color: ${({ isSelected }) =>
    isSelected ? colors.list.supportHighlightMedium : colors.list.neutralDark};
  border-bottom-left-radius: ${({ isLast }) =>
    isLast ? dimensions.border.radiusMd : dimensions.border.radiusNone};
  border-bottom-right-radius: ${({ isLast }) =>
    isLast ? dimensions.border.radiusMd : dimensions.border.radiusNone};
  border-top-left-radius: ${({ isSelected, isFirst }) =>
    isSelected && isFirst
      ? dimensions.border.radiusMd
      : dimensions.border.radiusNone};
`;

export const IDContainer = styled.View`
  padding: ${dimensions.spacing.inlineXxxs};
  align-items: center;
  flex: 1;
`;

interface TextProps {
  isSelected?: boolean;
}
export const Text = styled.Text<TextProps>`
  font-size: ${fonts.size.fontSizeXxs};
  font-family: ${fonts.family.brandPrimary};
  color: ${({ isSelected }) =>
    isSelected ? colors.list.supportHighlightMedium : colors.list.neutralDark};
`;

export const ValueContainer = styled.View`
  align-items: center;
  flex: 2;
  padding: ${dimensions.spacing.inlineXxxs};
`;
