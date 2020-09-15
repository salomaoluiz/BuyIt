import { useSelector, useDispatch } from 'react-redux';
import { productListSelectors, productListActions } from '@store/product-list';
import { useCallback, useEffect } from 'react';
import { Routes } from '@routes';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { ProductNavigatorParamsList } from '@navigator/product-navigator';

type NavProps = NavigationProp<ProductNavigatorParamsList, 'ProductLists'>;

const useProductLists = () => {
  const navigation = useNavigation<NavProps>();
  const productLists = useSelector(productListSelectors.getProductLists);
  
  const dispatch = useDispatch();
  const onNewButtonPress = useCallback(() => {
    navigation.navigate(Routes.NewList, {});
  }, []);

  const fetchProductLists = useCallback(() => {
    dispatch(productListActions.getProductListsAsync());
  }, []);

  useEffect(() => {
    fetchProductLists();
  }, []);

  return {
    productLists,
    onNewButtonPress,
    fetchProductLists,
  };
};

export default useProductLists;
