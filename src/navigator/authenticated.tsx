import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import ProductNavigator from './product-navigator';

import Drawer from './components/drawer';

import UnauthenticatedNavigator from './unauthenticated';
import { Routes } from '@routes';

export type AuthenticatedParamsList = {
  [Routes.ProductNavigator]: undefined;
  [Routes.UnauthenticatedNavigator]: undefined;
};

const AuthenticatedStack = createDrawerNavigator();

const AuthenticatedNavigator = () => {
  return (
    <>
      <AuthenticatedStack.Navigator drawerContent={Drawer}>
        <AuthenticatedStack.Screen
          name={Routes.ProductNavigator}
          component={ProductNavigator}
        />
        <AuthenticatedStack.Screen
          name={Routes.UnauthenticatedNavigator}
          component={UnauthenticatedNavigator}
          options={{ swipeEnabled: false }}
        />
      </AuthenticatedStack.Navigator>
    </>
  );
};

export default AuthenticatedNavigator;
