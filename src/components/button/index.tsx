import React from 'react';
import { Button as PaperButton } from 'react-native-paper';

export type ButtonMode = 'text' | 'outlined' | 'contained';

interface Props {
  onPress: () => void;
  title: string;
  icon?: string;
  mode?: ButtonMode;
  uppercase?: boolean;
}

const Button = (props: Props) => {
  const { onPress, title, icon, mode, uppercase } = props;

  return (
    <PaperButton onPress={onPress} icon={icon} mode={mode}>
      {uppercase ? title.toLocaleUpperCase() : title}
    </PaperButton>
  );
};

export default Button;
