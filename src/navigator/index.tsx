import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListItens from '@routes/list-itens';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ListItens" component={ListItens} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
