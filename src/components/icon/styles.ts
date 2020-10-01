import styled from 'styled-components/native';
import { Animated } from 'react-native';
import { dimensions } from '@styles';

export const KeyboardAvoidingView = styled.KeyboardAvoidingView``;

interface IconContainerProps {
  size?: number;
}
export const IconContainer = styled(Animated.View)<IconContainerProps>`
  justify-content: center;
  max-height: ${({ size }) => (size ? `${size}px` : dimensions.size.Sm)};
  max-width: ${({ size }) => (size ? `${size}px` : dimensions.size.Sm)};
`;
