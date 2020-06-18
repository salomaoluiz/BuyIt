import React from 'react';
import { Modal, GestureResponderEvent } from 'react-native';
import { Container, ModalBackground } from './styles';
import useMenuModal from './useMenuModal';

interface Props {
  children: JSX.Element[] | JSX.Element;
  visible: boolean;
  onDismissModal: (event: GestureResponderEvent) => void;
  position?: { pageX?: number; pageY?: number };
}
const MenuModal = (props: Props) => {
  const { children, visible, onDismissModal, position } = props;

  const { cordsXY } = useMenuModal({ position });

  return (
    <Modal
      visible={visible}
      animationType="fade"
      animated
      hardwareAccelerated
      transparent>
      <ModalBackground
        onPress={onDismissModal}
        activeOpacity={0.32}
        delayPressIn={0}
      />
      <Container cordsXY={cordsXY}>{children}</Container>
    </Modal>
  );
};

export default MenuModal;
