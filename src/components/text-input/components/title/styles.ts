import styled from 'styled-components';
import { Animated } from 'react-native';
import { colors, dimensions } from '@styles';

interface TitleProps {
  hasPrefix: boolean;
  isFocused: boolean;
  isError?: boolean;
}

const TitleText = styled(Animated.Text)<TitleProps>`
  position: absolute;
  color: ${({ isError, isFocused }) => {
		if (isError) return colors.list.supportDangerMedium;
		if (isFocused) return colors.list.brandPrimaryDark;
		return colors.list.neutralDarkest;
	}};
  border-radius: ${dimensions.border.radiusXs};
  background-color: ${colors.list.neutralLight};
  padding-left: ${dimensions.spacing.inlineXxxs};
  padding-right: ${dimensions.spacing.inlineXxxs};
  left: ${({ hasPrefix }) =>
		hasPrefix ? dimensions.spacing.inlineMd : dimensions.spacing.inlineXxs};
`;

export { TitleText };
