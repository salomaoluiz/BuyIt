import React from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Divider, Menu as PaperMenu } from 'react-native-paper';

import { ItemsContainer } from './styles';
import useMenu from './useMenu';

export type MenuItems = {
  onPress: () => void;
  title: string;
  icon?: string;
  hasDivider?: boolean;
};

export interface Props {
  items: MenuItems[];
  children: JSX.Element;
}

const Menu = (props: Props) => {
  const { children, items } = props;

  const {
    visible,
    handleCloseMenu,
    handleItemPress,
    handleOpenMenu,
  } = useMenu();
  const touchElement = () => {
    return (
      <TouchableWithoutFeedback onPress={handleOpenMenu}>
        {children}
      </TouchableWithoutFeedback>
    );
  };
  return (
    <PaperMenu
      visible={visible}
      onDismiss={handleCloseMenu}
      anchor={touchElement()}>
      {items.map((item) => {
        const onPress = handleItemPress(item.onPress);

        return (
          <ItemsContainer key={item.title}>
            <PaperMenu.Item
              onPress={onPress}
              title={item.title}
              icon={item.icon}
            />
            {item.hasDivider && <Divider />}
          </ItemsContainer>
        );
      })}
    </PaperMenu>
  );
};

export default Menu;
