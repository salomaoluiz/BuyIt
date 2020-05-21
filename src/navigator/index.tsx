import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductList from '@routes/product-list/product-list';
import { Routes } from '@routes';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={Routes.ProductList} component={ProductList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
