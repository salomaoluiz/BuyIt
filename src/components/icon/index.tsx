import React from 'react';
import { ViewStyle } from 'react-native';
import { IconContainer } from './styles';
import useIcon from './useIcon';
import { IconButton as PaperIconButton } from 'react-native-paper';

export interface Props {
  isVisible: boolean;
  onPress?: () => void;
  name: string;
  useAnimation?: boolean;
  color?: string;
  hitslop?: boolean;
  style?: ViewStyle;
  size?: number;
}

const Icon = (props: Props) => {
  const { isVisible, name, color, hitslop, style, size } = props;
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
        style={{ margin: 0 }}
      />
    </IconContainer>
  );
};

export default Icon;
