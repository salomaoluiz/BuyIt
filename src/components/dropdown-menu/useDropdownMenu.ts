import { useState, useCallback } from 'react';
import { Keyboard, GestureResponderEvent } from 'react-native';

const useDropdownMenu = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [positionModal, setPositionModal] = useState<
    { pageX?: number; pageY?: number } | undefined
  >();

  const onModalButtonPress = useCallback(
    (event: GestureResponderEvent) => {
      Keyboard.dismiss();

      setPositionModal({
        pageX: event.nativeEvent.pageX,
        pageY: event.nativeEvent.pageY,
      });

      if (!modalVisible) {
        setModalVisible(true);
      } else {
        setModalVisible(false);
      }
    },
    [modalVisible],
  );

  return {
    modalVisible,
    onModalButtonPress,
    positionModal,
  };
};

export default useDropdownMenu;
