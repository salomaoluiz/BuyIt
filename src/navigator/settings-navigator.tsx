import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import React from 'react';

import { Routes } from '@routes';
import Settings from '@routes/settings';

export type SettingsNavigatorParamsList = {
  [Routes.Settings]: undefined;
};

const SettingsStack = createStackNavigator<SettingsNavigatorParamsList>();

const SettingsNavigator = () => {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}
      headerMode="none"
      initialRouteName="Settings">
      <SettingsStack.Screen name={Routes.Settings} component={Settings} />
    </SettingsStack.Navigator>
  );
};

export default SettingsNavigator;
