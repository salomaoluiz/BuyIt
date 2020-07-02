// @ts-nocheck

import styled from 'styled-components/native';
import { dimensions, fonts, colors } from '@styles';
import NativeIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableNativeFeedback } from 'react-native';
import { ButtonMode } from '.';

const buttonModeStyle = (mode?: ButtonMode) => {
  if (mode === 'flat') {
    return {
      'background-color': colors.list.transparent,
    };
  }
  if (mode === 'outlined') {
    return {
      'border-width': dimensions.border.widthMedium,
      'border-color': colors.list.supportHighlightMedium,
    };
  }
  return {
    'background-color': colors.list.supportHighlightMedium,
  };
};

interface ContainerProps {
  mode?: ButtonMode;
}
const Container = styled.View<ContainerProps>`
  border-radius: ${dimensions.border.radiusSm};
  margin-top: ${dimensions.spacing.inlineXxs};
  margin-bottom: ${dimensions.spacing.inlineXxs};
  ${({ mode }) => buttonModeStyle(mode)}
`;

const Ripple = TouchableNativeFeedback.Ripple(colors.list.neutralDark, true);

interface SubContainerProps {
  hasIcon: boolean;
}

const SubContainer = styled.View<SubContainerProps>`
  flex-direction: ${({ hasIcon }) => (hasIcon ? 'row' : 'column')};
  align-items: center;
  justify-content: space-between;
  padding-left: ${dimensions.spacing.inlineXs};
  padding-right: ${dimensions.spacing.inlineXs};
  padding-top: ${dimensions.spacing.inlineXxs};
  padding-bottom: ${dimensions.spacing.inlineXxs};
`;

const Title = styled.Text`
  font-size: ${fonts.size.fontSizeXxs};
  padding: ${dimensions.spacing.inlineXxs};
  color: ${colors.list.neutralDarkest};
`;

const Icon = styled(NativeIcon)`
  elevation: ${dimensions.border.elevation};
  border-radius: ${dimensions.border.radiusCircle};
  align-items: center;
  justify-content: center;
  background-color: ${colors.list.neutralLight};
  padding: ${dimensions.spacing.inlineXxxs};
  font-size: ${fonts.size.fontSizeSm};
`;

export { Container, Title, Icon, SubContainer, Ripple };
