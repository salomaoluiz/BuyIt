import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  RouteProp,
  useRoute,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';

import { filterByID } from '@utils/filters';
import { productListSelectors, productListActions } from '@store/product-list';
import { ProductNavigatorParamsList } from '@navigator/product-navigator';

type RouteProps = RouteProp<ProductNavigatorParamsList, 'ProductItems'>;
type NavProps = NavigationProp<ProductNavigatorParamsList, 'ProductItems'>;

const useProductItems = () => {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation<NavProps>();
  const dispatch = useDispatch();
  const { listId } = route.params;
  const productLists = useSelector(productListSelectors.getProductLists);

  const currentList = filterByID(productLists, listId);
  const listName = currentList.name;
  const productItems = currentList.items;

  const fetchProductItems = useCallback(() => {
    dispatch(productListActions.getProductItemsAsync(listId));
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: listName,
    });
    fetchProductItems();
  }, []);

  return { productItems, listName, listId, fetchProductItems };
};

export default useProductItems;
