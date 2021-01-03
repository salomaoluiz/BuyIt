import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import React from 'react';

import { Routes } from '@routes';
import NewListItem from '@routes/new-item';
import Stock from '@routes/stock';
import { productListActions } from '@store/product-list';
import { ProductItem } from '@store/product-list/types';
import { stockActions } from '@store/stock';

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
