import React from 'react';

import { TouchableNativeFeedback } from 'react-native';
import { Container, Title, Icon, SubContainer, Ripple } from './styles';

export type ButtonMode = 'outlined' | 'container' | 'flat';

interface Props {
  onPress: () => void;
  title: string;
  icon?: string;
  mode?: ButtonMode;
}
const Button = (props: Props) => {
  const { onPress, title, icon, mode } = props;
  return (
    <Container mode={mode}>
      <TouchableNativeFeedback onPress={onPress} background={Ripple}>
        <SubContainer hasIcon={!!icon}>
          <Title>{title}</Title>
          {icon && <Icon name={icon} />}
        </SubContainer>
      </TouchableNativeFeedback>
    </Container>
  );
};

export default Button;
