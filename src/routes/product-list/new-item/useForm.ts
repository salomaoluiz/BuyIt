import { useState, useCallback } from 'react';
import useFormError from '@errors/useFormError';
import { useRoute, RouteProp } from '@react-navigation/native';
import { ProductNavigatorParamsList } from '@navigator/product-navigator';

type RouteProps = RouteProp<ProductNavigatorParamsList, 'NewListItem'>;

const useForm = () => {
  const route = useRoute<RouteProps>();
  const listId = route.params.listId;
  const editName = route.params?.productItem?.name || '';
  const editAmount = route.params?.productItem?.amount || '';
  const editQtd = route.params?.productItem?.qtd || '';
  const editId = route.params?.productItem?.id || undefined;
  const editBrand = route.params?.productItem?.brand || '';
  const editUnit = route.params?.productItem?.unit || 'un';

  const [name, setName] = useState(editName);
  const [amount, setAmount] = useState(editAmount);
  const [qtd, setQtd] = useState(editQtd);
  const [brand, setBrand] = useState(editBrand);
  const [unit, setUnit] = useState(editUnit);

  const formParams = { id: editId, name, amount, qtd, unit, brand };

  const { validateError, handleErrorMessage } = useFormError(
    formParams,
    'productItem',
  );

  const checkForm = useCallback(async () => {
    const isValid = await validateError();
    return isValid;
  }, [formParams]);

  return {
    formParams,
    setName,
    setAmount,
    setQtd,
    checkForm,
    setBrand,
    handleErrorMessage,
    setUnit,
    listId,
  };
};

export default useForm;
