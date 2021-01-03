import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { Routes } from '@routes';
import Login from '@routes/auth/login';
import RegisterUser from '@routes/auth/register';

export type UnauthenticatedParamsList = {
  [Routes.Login]: undefined;
  [Routes.RegisterUser]: {
    email?: string;
  };
};

const UnauthenticatedStack = createStackNavigator<UnauthenticatedParamsList>();

const UnauthenticatedNavigator = () => {
  return (
    <UnauthenticatedStack.Navigator headerMode="none">
      <UnauthenticatedStack.Screen name={Routes.Login} component={Login} />
      <UnauthenticatedStack.Screen
        name={Routes.RegisterUser}
        component={RegisterUser}
      />
    </UnauthenticatedStack.Navigator>
  );
};

export default UnauthenticatedNavigator;
