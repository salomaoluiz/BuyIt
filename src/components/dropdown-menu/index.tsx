import * as React from 'react';

import MenuButton from './components/button';
import MenuModal from './components/modal';
import MenuItem from './components/item';
import useDropdownMenu from './useDropdownMenu';
import { Container, CustomContainer } from './styles';

interface Props {
  listValues: { id: string; icon?: string; value: string }[];
  setValue: (value: string) => void;
  selectedValue: string;
  title?: string;
  icon?: string;
  error?: boolean;
  helperText?: string;
  customMenuButton?: (buttonProps: {
    modalVisible: boolean;
    selectedValue: string;
  }) => JSX.Element;
}

const DropdownMenu = (props: Props) => {
  const {
    title,
    icon,
    setValue,
    selectedValue,
    listValues,
    customMenuButton,
  } = props;
  const { onModalButtonPress, modalVisible, positionModal } = useDropdownMenu();

  return (
    <Container isModalVisible={modalVisible}>
      {customMenuButton ? (
        <CustomContainer onPress={onModalButtonPress}>
          {customMenuButton({
            modalVisible,
            selectedValue,
          })}
        </CustomContainer>
      ) : (
        <MenuButton
          isModalVisible={modalVisible}
          setModalVisible={onModalButtonPress}
          title={title}
          icon={icon}
          selectedValue={selectedValue}
        />
      )}
      <MenuModal
        onDismissModal={onModalButtonPress}
        visible={modalVisible}
        position={positionModal}>
        <MenuItem
          selectedValue={selectedValue}
          listValues={listValues}
          setValue={setValue}
          onDismissModal={onModalButtonPress}
        />
      </MenuModal>
    </Container>
  );
};

export default DropdownMenu;
