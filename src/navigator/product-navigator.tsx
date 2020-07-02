import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import ProductList from '@routes/product-list/product-list';
import NewProduct from '@routes/product-list/new-product';

import { Routes } from '@routes';
import { ProductItem } from '@store/product-list/types';
import navigationStyles from 'src/styles/navigationStyles';

export type ProductNavigatorParamsList = {
  [Routes.ProductList]: undefined;
  [Routes.NewProduct]: {
    productItem?: ProductItem;
  };
};

const ProductStack = createStackNavigator<ProductNavigatorParamsList>();

const ProductNavigator = () => {
  return (
    <ProductStack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <ProductStack.Screen name={Routes.ProductList} component={ProductList} />
      <ProductStack.Screen
        name={Routes.NewProduct}
        component={NewProduct}
        options={navigationStyles.defaultHeader}
      />
    </ProductStack.Navigator>
  );
};

export default ProductNavigator;
