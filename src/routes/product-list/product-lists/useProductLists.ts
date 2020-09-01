import { useSelector } from 'react-redux';
import { productListSelectors } from '@store/product-list';
import { useCallback } from 'react';
import { Routes } from '@routes';
import { Props } from '.';

const useProductLists = (props: Props) => {
  const { navigation } = props;
  const productLists = useSelector(productListSelectors.getProductLists);
  const onNewButtonPress = useCallback(() => {
    navigation.navigate(Routes.NewList, {});
  }, []);

  return {
    productLists,
    onNewButtonPress,
  };
};

export default useProductLists;
