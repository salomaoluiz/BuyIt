import React from 'react';
import { FAB as PaperFAB } from 'react-native-paper';

interface Props {
  onPress: () => void;
  icon: string;
  small?: boolean;
}

const FABButton = (props: Props) => {
  const { onPress, icon, small } = props;
  return <PaperFAB icon={icon} onPress={onPress} small={small} />;
};

export default FABButton;
