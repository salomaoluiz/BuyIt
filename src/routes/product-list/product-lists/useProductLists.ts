import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ProductNavigatorParamsList } from '@navigator/product-navigator';
import { Routes } from '@routes';
import { productListSelectors, productListActions } from '@store/product-list';
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
    dispatch(productListActions.requestLists());
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
