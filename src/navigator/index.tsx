import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductList from '@routes/product-list/product-list';
import NewProduct from '@routes/product-list/new-product';

import { Routes } from '@routes';
import { ProductItem } from '@store/product-list/types';
import navigationStyles from 'src/styles/navigationStyles';
import useNavigator from './useNavigator';
import { ActivityIndicator } from 'react-native';

export type RootStackParamsList = {
  [Routes.ProductList]: undefined;
  [Routes.NewProduct]: {
    productItem?: ProductItem;
  };
};

const Stack = createStackNavigator<RootStackParamsList>();

const AppNavigator = () => {
  const { isRehydrated } = useNavigator();

  const shouldShowLoading = !isRehydrated;
  const shouldShowScreens = isRehydrated;

  return (
    <NavigationContainer>
      {shouldShowLoading && <ActivityIndicator />}
      {shouldShowScreens && (
        <Stack.Navigator>
          <Stack.Screen name={Routes.ProductList} component={ProductList} />
          <Stack.Screen
            name={Routes.NewProduct}
            component={NewProduct}
            options={navigationStyles.defaultHeader}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
