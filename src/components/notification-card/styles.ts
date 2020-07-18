import styled from 'styled-components/native';
import NativeIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { dimensions, colors, fonts } from '@styles';
import { Animated } from 'react-native';

const Container = styled(Animated.View)`
  position: absolute;
  align-self: center;
  padding-top: ${dimensions.spacing.inlineXxs};
  padding-bottom: ${dimensions.spacing.inlineXxs};
  padding-left: ${dimensions.spacing.inlineSm};
  padding-right: ${dimensions.spacing.inlineSm};
  top: ${dimensions.spacing.inlineMd};
  background-color: ${colors.list.neutralLight};
  border-radius: ${dimensions.border.radiusSm};
  min-height: ${dimensions.size.stackXl};
  elevation: ${dimensions.border.elevation};
  min-width: ${dimensions.size.stackXXxl};
  margin-left: ${dimensions.spacing.inlineXl};
`;

const Button = styled.TouchableOpacity`
  align-items: center;
`;

const IconContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

const Icon = styled(NativeIcon)`
  font-size: ${dimensions.size.stackSm};
`;

const TextContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;

const Title = styled.Text`
  font-size: ${fonts.size.fontSizeXxs};
  font-weight: ${fonts.weight.bold};
  align-self: center;
  max-width: ${dimensions.size.stackXXxl};
  padding-left: ${dimensions.spacing.insetXs};
  padding-right: ${dimensions.spacing.inlineXs};
  text-align: center;
`;

const BodyText = styled.Text`
  font-size: ${fonts.size.fontSizeXxxs};
  font-weight: ${fonts.weight.regular};
  text-align: justify;
`;

export {
  Button,
  Container,
  IconContainer,
  Icon,
  TextContainer,
  Title,
  BodyText,
};
