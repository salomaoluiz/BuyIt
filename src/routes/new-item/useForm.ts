import { useRoute, RouteProp } from '@react-navigation/native';
import { useState, useCallback } from 'react';

import { PaperListData } from '@components/list';
import useFormError from '@errors/useFormError';
import { translate } from '@locales';
import { ProductNavigatorParamsList } from '@navigator/product-navigator';


type RouteProps = RouteProp<ProductNavigatorParamsList, 'NewListItem'>;

const useForm = () => {
  const route = useRoute<RouteProps>();

  const editName = route.params?.productItem?.name || '';
  const editAmount = route.params?.productItem?.amount || '';
  const editQtd = route.params?.productItem?.qtd || '';
  const editId = route.params?.productItem?.id || undefined;
  const editBrand = route.params?.productItem?.brand || '';
  const editUnit = route.params?.productItem?.unit || { id: 'un', title: translate('unit.unit') };
  const editDueDate = route.params?.productItem?.dueDate || undefined;
  const editBarcode = route.params?.productItem?.barcode || undefined;

  const [name, setName] = useState(editName);
  const [amount, setAmount] = useState(editAmount);
  const [qtd, setQtd] = useState(editQtd);
  const [brand, setBrand] = useState(editBrand);
  const [barcode, setBarcode] = useState(editBarcode);
  const [dueDate, setDueDate] = useState(editDueDate);
  const [unit, setUnit] = useState<PaperListData>(editUnit);

  const formParams = {
    id: editId,
    name,
    amount,
    qtd,
    unit,
    brand,
    dueDate,
    barcode,
  };

  const { validateError, handleErrorMessage } = useFormError({
    formParams,
    formName: 'productItem',
  });

  const checkForm = useCallback(() => validateError(), [formParams]);

  return {
    formParams,
    setParams: {
      setName,
      setAmount,
      setQtd,
      setBrand,
      setUnit,
      setDueDate,
      setBarcode,
    },
    checkForm,
    handleErrorMessage,
  };
};

export default useForm;
