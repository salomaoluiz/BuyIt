import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';

import { translate } from '@locales';
import { Routes } from '@routes';

import Drawer from './components/drawer';
import ProductNavigator from './product-navigator';
import SettingsNavigator from './settings-navigator';
import StockNavigator from './stock-navigator';
import UnauthenticatedNavigator from './unauthenticated';

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
          options={{ title: translate('productLists.productLists') }}
        />
        <AuthenticatedStack.Screen
          name={Routes.StockNavigator}
          component={StockNavigator}
          options={{ title: translate('stock.stock') }}
        />
        <AuthenticatedStack.Screen
          name={Routes.SettingsNavigator}
          component={SettingsNavigator}
          options={{ title: translate('settings.settings') }}
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
