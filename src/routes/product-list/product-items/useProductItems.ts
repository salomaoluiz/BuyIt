import { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RouteProp, useRoute } from '@react-navigation/native';

import { filterByID } from '@utils/filters';
import { productListSelectors, productListActions } from '@store/product-list';
import { ProductNavigatorParamsList } from '@navigator/product-navigator';
import { sortByDate } from '@utils/sort';

type RouteProps = RouteProp<ProductNavigatorParamsList, 'ProductItems'>;

const useProductItems = () => {
  const route = useRoute<RouteProps>();
  const dispatch = useDispatch();
  const { listId } = route.params;
  const productLists = useSelector(productListSelectors.getProductLists);

  const currentList = filterByID(productLists, listId);
  const listName = currentList.name;
  const productItems = currentList.items;
  const [ordenedList, setOrdenedList] = useState(productItems);

  const fetchProductItems = useCallback(() => {
    dispatch(productListActions.getProductItemsAsync(listId));
  }, []);

  useEffect(() => {
    fetchProductItems();
  }, []);

  useEffect(() => {
    if (productItems) {
      const newOrdenedList = sortByDate(productItems, 'updatedAt');
      setOrdenedList(newOrdenedList);
    }
  }, [productItems]);

  return { ordenedList, listName, listId, fetchProductItems };
};

export default useProductItems;
