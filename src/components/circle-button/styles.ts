// @ts-nocheck

import styled from 'styled-components/native';
import { dimensions, fonts, colors } from '@styles';
import NativeIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableNativeFeedback } from 'react-native';

const Container = styled.View`
  border-radius: ${dimensions.border.radiusCircle};
  width: ${dimensions.size.stackXl};
  height: ${dimensions.size.stackXl};
  elevation: ${dimensions.border.elevation};
  background-color: ${colors.list.supportHighlightMedium};
  align-items: center;
  justify-content: center;
`;

const Ripple = TouchableNativeFeedback.Ripple(colors.list.neutralDark, true);

const SubContainer = styled.View<SubContainerProps>`
  align-items: center;
  justify-content: center;
`;

const Icon = styled(NativeIcon)`
  elevation: ${dimensions.border.elevation};
  background-color: ${colors.list.neutralLight};
  border-radius: ${dimensions.border.radiusCircle};
  align-items: center;
  justify-content: center;
  padding: ${dimensions.spacing.inlineXxs};
  font-size: ${fonts.size.fontSizeMd};
`;

export { Container, Icon, SubContainer, Ripple };
