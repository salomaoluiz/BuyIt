import * as React from 'react';

import { View } from 'react-native';
import Button from '@components/button';
import useDrawerBottom from './useDrawerBottom';

const DrawerBottom = () => {
  const { onLogoutPress } = useDrawerBottom();
  return (
    <View>
      <Button title="Logout" onPress={onLogoutPress} mode="text" />
    </View>
  );
};

export default DrawerBottom;
