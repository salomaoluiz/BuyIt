import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import ProductItems from '@routes/product-list/product-items';
import NewListItem from '@routes/product-list/new-item';

import { Routes } from '@routes';
import { ProductItem, ProductList } from '@store/product-list/types';
import ProductLists from '@routes/product-list/product-lists';
import NewList from '@routes/product-list/new-list';

export type ProductNavigatorParamsList = {
  [Routes.ProductLists]: undefined;
  [Routes.ProductItems]: {
    listId: string;
  };
  [Routes.NewList]: {
    productList?: ProductList;
  };
  [Routes.NewListItem]: {
    productItem?: ProductItem;
    listId: string;
  };
};

const ProductStack = createStackNavigator<ProductNavigatorParamsList>();

const ProductNavigator = () => {
  return (
    <ProductStack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}
      initialRouteName="ProductLists">
      <ProductStack.Screen
        name={Routes.ProductItems}
        component={ProductItems}
      />
      <ProductStack.Screen name={Routes.NewListItem} component={NewListItem} />
      <ProductStack.Screen
        name={Routes.ProductLists}
        component={ProductLists}
      />
      <ProductStack.Screen name={Routes.NewList} component={NewList} />
    </ProductStack.Navigator>
  );
};

export default ProductNavigator;
