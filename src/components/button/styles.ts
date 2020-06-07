// @ts-nocheck

import styled from 'styled-components/native';
import { dimensions, fonts, colors } from '@styles';
import NativeIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableNativeFeedback } from 'react-native';

const Container = styled.View`
  border-radius: ${dimensions.border.radiusSm};
  elevation: ${dimensions.border.elevation};  
  background-color: ${colors.list.supportHighlightMedium};
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
