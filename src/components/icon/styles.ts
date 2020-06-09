import styled from 'styled-components/native';
import { Animated, TouchableNativeFeedback } from 'react-native';
import { dimensions, fonts, colors } from '@styles';
import NativeIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const IconContainer = styled(Animated.View)`
  padding: ${dimensions.spacing.inlineXxxs};
  align-items: center;
  justify-content: center;
  border-radius: ${dimensions.border.radiusCircle};
  height: ${dimensions.size.stackMd};
  width: ${dimensions.size.stackMd};
`;

const GenericIcon = styled(NativeIcon)`
  font-size: ${fonts.size.fontSizeSm};
  color: ${({ color }) => color || colors.list.neutralDark};
`;

const IconButton = styled.TouchableNativeFeedback``;

const Ripple = TouchableNativeFeedback.Ripple(colors.list.neutralDark, true);

export { IconContainer, GenericIcon, IconButton, Ripple };
