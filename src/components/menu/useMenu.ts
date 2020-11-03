import { useState } from 'react';

const useMenu = () => {
  const [visible, setVisible] = useState(false);

  const handleOpenMenu = () => {
    setVisible(true);
  };

  const handleCloseMenu = () => {
    setVisible(false);
  };

  const handleItemPress = (callback: () => void) => {
    return () => {
      handleCloseMenu();
      callback();
    };
  };

  return {
    visible,
    handleCloseMenu,
    handleItemPress,
    handleOpenMenu,
  };
};

export default useMenu;
