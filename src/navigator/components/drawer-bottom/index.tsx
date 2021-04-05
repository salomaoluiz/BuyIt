import * as React from 'react';
import { View } from 'react-native';

import Button from '@components/button';
import { translate } from '@locales';

import useDrawerBottom from './useDrawerBottom';

const DrawerBottom = () => {
  const { onLogoutPress } = useDrawerBottom();
  return (
    <View>
      <Button title={translate('general.logout')} onPress={onLogoutPress} mode="text" />
    </View>
  );
};

export default DrawerBottom;
