import React from 'react';
import { GenericIcon, IconButton, IconContainer, Ripple } from './styles';
import useIcon from './useIcon';

export interface Props {
  isVisible: boolean;
  onPress?: () => void;
  name: string;
  useAnimation?: boolean;
  color?: string;
}

const Icon = (props: Props) => {
  const { isVisible, name, onPress, color } = props;
  const { handlePress, visibleAnimation } = useIcon(props);

  if (!isVisible) return null;

  const EmbedButton = ({ children }: { children: JSX.Element }) => {
    if (onPress)
      return (
        <IconButton background={Ripple} onPress={handlePress}>
          {children}
        </IconButton>
      );

    return children;
  };

  return (
    <IconContainer style={{ transform: [{ scale: visibleAnimation }] }}>
      <EmbedButton>
        <IconContainer>
          <GenericIcon name={name} color={color} />
        </IconContainer>
      </EmbedButton>
    </IconContainer>
  );
};

export default Icon;
