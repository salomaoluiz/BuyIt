import React from 'react';
import { TouchableRipple as PaperTouchableRipple } from 'react-native-paper';

import { Container } from './styles';

interface Props {
  onPress: () => void;
  children: JSX.Element;
  withoutBackground?: boolean;
}

const TouchableRipple = (props: Props) => {
  const { children, onPress, withoutBackground } = props;

  return (
    <Container>
      <PaperTouchableRipple
        rippleColor={withoutBackground ? 'rgba(0,0,0,0)' : undefined}
        onPress={onPress}>
        {children}
      </PaperTouchableRipple>
    </Container>
  );
};

export default TouchableRipple;
