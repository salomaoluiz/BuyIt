import React from 'react';

import { TouchableNativeFeedback } from 'react-native';
import { Container, Icon, SubContainer, Ripple } from './styles';

interface Props {
  onPress: () => void;
  icon: string;
}

const CircleButton = (props: Props) => {
  const { onPress, icon } = props;
  return (
    <Container>
      <TouchableNativeFeedback onPress={onPress} background={Ripple}>
        <SubContainer>
          <Icon name={icon} />
        </SubContainer>
      </TouchableNativeFeedback>
    </Container>
  );
};

export default CircleButton;
