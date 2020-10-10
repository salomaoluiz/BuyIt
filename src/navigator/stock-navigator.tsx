import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import NewListItem from '@routes/new-item';

import { Routes } from '@routes';
import { ProductItem } from '@store/product-list/types';
import { productListActions } from '@store/product-list';
import { stockActions } from '@store/stock';
import Stock from '@routes/stock';

export type StockNavigatorParamsList = {
  [Routes.Stock]: undefined;
  [Routes.NewListItem]: {
    productItem?: ProductItem;
    action: typeof productListActions | typeof stockActions;
  };
};

const ProductStack = createStackNavigator<StockNavigatorParamsList>();

const StockNavigator = () => {
  return (
    <ProductStack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}
      headerMode="none"
      initialRouteName="Stock">
      <ProductStack.Screen name={Routes.Stock} component={Stock} />
      <ProductStack.Screen name={Routes.NewListItem} component={NewListItem} />
    </ProductStack.Navigator>
  );
};

export default StockNavigator;
