import { useDispatch, useSelector } from 'react-redux';
import { useState, useCallback } from 'react';

import { generateUniqueID } from '@utils/id';

import { Props } from '.';

import { filterNotByID } from '@utils/filters';
import validateForm, { ErrorInterface } from 'src/errors/forms';
import productListSelectors from '@store/product-list/selectors';
import { productListActions } from '@store/product-list';

const useNewProduct = ({ navigation, route }: Props) => {
  const editName = route.params?.productItem?.name;
  const editAmount = route.params?.productItem?.amount;
  const editQtd = route.params?.productItem?.qtd;
  const editId = route.params?.productItem?.id;
  const editBrand = route.params?.productItem?.brand;
  const editUnit = route.params?.productItem?.unit;

  const [name, setName] = useState(editName || '');
  const [amount, setAmount] = useState(editAmount || '');
  const [qtd, setQtd] = useState(editQtd || '');
  const [brand, setBrand] = useState(editBrand || '');
  const [unit, setUnit] = useState(editUnit || 'un');
  const [isLoading, setIsLoading] = useState(false);
  const [errorItems, setErrorItems] = useState<ErrorInterface>();

  const { productList } = useSelector(productListSelectors.getState);

  const fieldsHook = [name, amount, qtd, unit, brand];
  const dispatch = useDispatch();

  const canAddNewItem = useCallback(async () => {
    const errors = await validateForm(
      { name, amount, brand, qtd },
      'productList',
    );

    if (errors) {
      setErrorItems(errors);
      return false;
    }

    return true;
  }, fieldsHook);

  const generateNewItemData = useCallback(() => {
    const id = generateUniqueID();
    const itemsList = filterNotByID(productList, editId);

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
        const error = errorItems.errors.find((err) => err.errorItem === item);

        if (error) return { error: true, helperText: error?.errorMessage };
      }

      return { error: false, helperText: infoHelper };
    },
    [errorItems],
  );

  const onSaveButtonPress = useCallback(async () => {
    setIsLoading(true);

    try {
      const canAdd = await canAddNewItem();

      if (canAdd) {
        const newItemsData = generateNewItemData();
        dispatch(productListActions.setProductList(newItemsData));
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
