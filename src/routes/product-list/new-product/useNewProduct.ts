import { useDispatch, useSelector } from 'react-redux';
import { useState, useCallback } from 'react';

import { RootState } from '@store/reducers';
import { generateUniqueID } from '@utils/id';

import { Props } from '.';
import { setItemsData } from '../store/actions';
import { ItemsDataArray } from '../store/types';
import { filterNotByID } from '@utils/filters';
import validate, { ErrorInterface } from 'src/errors/forms';

const useNewProduct = ({ navigation, route }: Props) => {
  const editName = route.params?.itemData?.name;
  const editAmount = route.params?.itemData?.amount;
  const editQtd = route.params?.itemData?.qtd;
  const editId = route.params?.itemData?.id;
  const editBrand = route.params?.itemData?.brand;
  const editUnit = route.params?.itemData?.unit;

  const [name, setName] = useState(editName || '');
  const [amount, setAmount] = useState(editAmount || '');
  const [qtd, setQtd] = useState(editQtd || '');
  const [brand, setBrand] = useState(editBrand || '');
  const [unit, setUnit] = useState(editUnit || 'un');
  const [isLoading, setIsLoading] = useState(false);
  const [errorItems, setErrorItems] = useState<ErrorInterface>();

  const itemsData = useSelector<RootState, ItemsDataArray>(
    (state) => state.productListReducers.itemsData,
  );

  const fieldsHook = [name, amount, qtd, unit, brand];
  const dispatch = useDispatch();

  const canAddNewItem = useCallback(async () => {
    const errors = await validate({ name, amount, brand, qtd }, 'productList');

    if (errors) {
      setErrorItems(errors);
      return false;
    }

    return true;
  }, fieldsHook);

  const generateNewItemData = useCallback(() => {
    const id = generateUniqueID();
    const itemsList = filterNotByID(itemsData, editId);

    const newItem = [
      {
        amount,
        brand,
        id,
        name,
        qtd,
        unit,
      },
    ];

    return itemsList.concat(newItem);
  }, fieldsHook);

  const handleFindError = useCallback(
    (item: string, infoHelper?: string) => {
      if (errorItems) {
        const error = errorItems.errors.find(
          (error) => error.errorItem === item,
        );

        if (error) return { error: true, helperText: error?.errorMessage };
      }

      return { helperText: infoHelper };
    },
    [errorItems],
  );

  const onSaveButtonPress = useCallback(async () => {
    setIsLoading(true);

    try {
      const canAdd = await canAddNewItem();

      if (canAdd) {
        const newItemsData = generateNewItemData();
        dispatch(setItemsData(newItemsData));
        navigation.goBack();
      }
    } finally {
      setIsLoading(false);
    }
  }, fieldsHook);

  return {
    name,
    setName,
    amount,
    setAmount,
    qtd,
    setQtd,
    brand,
    errorItems,
    setBrand,
    handleFindError,
    setUnit,
    unit,
    onSaveButtonPress,
    isLoading,
  };
};

export default useNewProduct;
