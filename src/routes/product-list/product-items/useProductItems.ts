import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  RouteProp,
  useRoute,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';

import { filterByID } from '@utils/filters';
import { productListSelectors } from '@store/product-list';
import { ProductNavigatorParamsList } from '@navigator/product-navigator';

type RouteProps = RouteProp<ProductNavigatorParamsList, 'ProductItems'>;
type NavProps = NavigationProp<ProductNavigatorParamsList, 'ProductItems'>;

const useProductItems = () => {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation<NavProps>();

  const { listId } = route.params;
  const productLists = useSelector(productListSelectors.getProductLists);

  const currentList = filterByID(productLists, listId);
  const listName = currentList.name;
  const productItems = currentList.items;

  useEffect(() => {
    navigation.setOptions({
      title: listName,
    });
  }, []);

  return { productItems, listName, listId };
};

export default useProductItems;
