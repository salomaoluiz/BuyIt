import styled from 'styled-components/native';
import { Animated } from 'react-native';

export const KeyboardAvoidingView = styled.KeyboardAvoidingView``;

interface IconContainerProps {
  size?: number;
}
export const IconContainer = styled(Animated.View)<IconContainerProps>`
  justify-content: center;
`;
