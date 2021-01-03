import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import React from 'react';

import { Routes } from '@routes';
import NewListItem from '@routes/new-item';
import NewList from '@routes/product-list/new-list';
import ProductItems from '@routes/product-list/product-items';
import ProductLists from '@routes/product-list/product-lists';
import { productListActions } from '@store/product-list';
import { ProductItem, ProductList } from '@store/product-list/types';
import { stockActions } from '@store/stock';

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
    action: typeof productListActions | typeof stockActions;
  };
};

const ProductStack = createStackNavigator<ProductNavigatorParamsList>();

const ProductNavigator = () => {
  return (
    <ProductStack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}
      headerMode="none"
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
