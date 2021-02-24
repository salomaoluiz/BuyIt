import { RouteProp, useRoute } from '@react-navigation/native';
import { useState, useCallback } from 'react';

import useFormError from '@errors/useFormError';
import { ProductNavigatorParamsList } from '@navigator/product-navigator';

type RouteProps = RouteProp<ProductNavigatorParamsList, 'NewList'>;

const useForm = () => {
  const route = useRoute<RouteProps>();
  const listId = route.params?.productList?.id || undefined;
  const listName = route.params?.productList?.name || '';
  const listItems = route.params?.productList?.items || [];
  const listBuyDate = route.params?.productList?.buyDate || undefined;

  const [name, setName] = useState(listName);
  const [buyDate, setBuyDate] = useState(listBuyDate);
  const [id] = useState(listId);
  const [items] = useState(listItems);

  const formParams = { name, buyDate };
  const listParams = { ...formParams, id, items };

  const { validateError, errorItems, handleErrorMessage } = useFormError({
    formParams,
    formName: 'productList',
  });

  const checkForm = useCallback(() => validateError(), [formParams]);

  return {
    listParams,
    setName,
    setBuyDate,
    checkForm,
    errorItems,
    handleErrorMessage,
  };
};

export default useForm;
