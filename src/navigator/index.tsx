import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductList from '@routes/product-list/product-list';
import NewProduct from '@routes/product-list/new-product';

import { Routes } from '@routes';
import { ItemsData } from '@routes/product-list/store/types';

export type RootStackParamsList = {
  [Routes.ProductList]: undefined;
  [Routes.NewProduct]: {
    itemData?: ItemsData;
  };
};

const Stack = createStackNavigator<RootStackParamsList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={Routes.ProductList} component={ProductList} />
        <Stack.Screen name={Routes.NewProduct} component={NewProduct} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
