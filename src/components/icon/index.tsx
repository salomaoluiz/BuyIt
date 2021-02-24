import React from 'react';
import { ViewStyle } from 'react-native';
import { IconButton as PaperIconButton } from 'react-native-paper';

import { IconContainer } from './styles';
import useIcon from './useIcon';

export interface Props {
  isVisible: boolean;
  onPress?: () => void;
  name: string;
  useAnimation?: boolean;
  color?: string;
  hitslop?: boolean;
  style?: ViewStyle;
  size?: number;
  disabled?: boolean;
}

const Icon = (props: Props) => {
  const { isVisible, name, color, hitslop, style, size, disabled } = props;
  const { handlePress, visibleAnimation } = useIcon(props);

  const buttonHitSlop = hitslop
    ? { bottom: 24, left: 24, right: 24, top: 24 }
    : undefined;

  if (!isVisible) return null;

  return (
    <IconContainer
      hitSlop={buttonHitSlop}
      style={[{ transform: [{ scale: visibleAnimation }] }, style]}
      size={size}>
      <PaperIconButton
        icon={name}
        color={color}
        size={size}
        onPress={handlePress}
        disabled={disabled}
        style={{ margin: 0 }}
      />
    </IconContainer>
  );
};

export default Icon;
