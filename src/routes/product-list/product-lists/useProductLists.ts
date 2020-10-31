import { useSelector, useDispatch } from 'react-redux';
import { productListSelectors, productListActions } from '@store/product-list';
import { useCallback, useEffect, useState } from 'react';
import { Routes } from '@routes';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { ProductNavigatorParamsList } from '@navigator/product-navigator';
import { sortByDate } from '@utils/sort';

type NavProps = NavigationProp<ProductNavigatorParamsList, 'ProductLists'>;

const useProductLists = () => {
  const navigation = useNavigation<NavProps>();
  const productLists = useSelector(productListSelectors.getProductLists);
  const [ordenedList, setOrndenedList] = useState(productLists);

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

  useEffect(() => {
    const ordenedByUpdateList = sortByDate(productLists, 'updatedAt');

    setOrndenedList(ordenedByUpdateList);
  }, [productLists]);
  
  return {
    ordenedList,
    onNewButtonPress,
    fetchProductLists,
  };
};

export default useProductLists;
