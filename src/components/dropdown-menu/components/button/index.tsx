import React from 'react';

import {
  Container,
  IconContainer,
  Value,
  BorderContainer,
  SubContainer,
  Ripple,
  Button,
} from './styles';
import { GenericIcon } from '@components/icon/styles';

import AnimatedTitle from '@components/animated-title';
import { GestureResponderEvent } from 'react-native';

interface Props {
  setModalVisible: (event: GestureResponderEvent) => void;
  title?: string;
  icon?: string;
  selectedValue?: string;
  isModalVisible: boolean;
}

const MenuButton = (props: Props) => {
  const {
    setModalVisible,
    selectedValue,
    title,
    icon,
    isModalVisible,
  } = props;

  return (
    <Container>
      {!!icon && (
        <IconContainer>
          <GenericIcon name={icon} />
        </IconContainer>
      )}
      <BorderContainer isModalVisible={isModalVisible}>
        <Button background={Ripple} onPress={setModalVisible}>
          <SubContainer>
            <AnimatedTitle
              isFocused={isModalVisible}
              title={title}
              hasValue={!!selectedValue}
              startWithValue={!!selectedValue}
            />

            <Value>{selectedValue}</Value>

            <IconContainer >
              <GenericIcon name="chevron-down" />
            </IconContainer>
          </SubContainer>
        </Button>
      </BorderContainer>
    </Container>
  );
};

export default MenuButton;
