import { useState, useCallback } from 'react';
import useFormError from '@errors/useFormError';
import { RouteProp, useRoute } from '@react-navigation/native';
import { ProductNavigatorParamsList } from '@navigator/product-navigator';

type RouteProps = RouteProp<ProductNavigatorParamsList, 'NewList'>;

const useForm = () => {
  const route = useRoute<RouteProps>();
  const listId = route.params?.productList?.id || undefined;
  const listName = route.params?.productList?.name || '';
  const listItems = route.params?.productList?.items || [];

  const [name, setName] = useState(listName);
  const [id] = useState(listId);
  const [items] = useState(listItems);

  const formParams = { name };
  const listParams = { ...formParams, id, items };

  const { validateError, errorItems, handleErrorMessage } = useFormError(
    { ...formParams },
    'productList',
  );

  const checkForm = useCallback(async () => {
    const isValid = await validateError();
    return isValid;
  }, [formParams]);

  return {
    listParams,
    setName,
    checkForm,
    errorItems,
    handleErrorMessage,
  };
};

export default useForm;
