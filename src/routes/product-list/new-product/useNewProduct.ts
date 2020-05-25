import { useDispatch, useSelector } from 'react-redux';
import { useState, useCallback } from 'react';

import { RootState } from '@store/reducers';
import { generateUniqueID } from '@utils/id';
import { useErrorMessage } from '@utils/handleErrors';
import errorsString from '@locales/general-errors';

import { Props } from '.';
import { setItemsData } from '../store/actions';
import { ItemsDataArray } from '../store/types';

const useNewProduct = ({ navigation }: Props) => {
  const qtdDefault = 1;
  const [name, setName] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [qtd, setQtd] = useState<string>('');
  const itemsData = useSelector<RootState, ItemsDataArray>(
    (state) => state.productListReducers.itemsData,
  );

  const dispatch = useDispatch();

  const canAddNewItem = useCallback(() => {
    const isNaNAmount = isNaN(parseInt(amount));
    const isEmptyName = !name;

    if (isEmptyName) throw new Error(errorsString.productList.insertValidName);
    if (isNaNAmount)
      throw new Error(errorsString.productList.insertValidAmount);
  }, [name, amount, qtd]);

  const generateNewItemData = useCallback(() => {
    const setDefaultQtd = qtd || qtdDefault.toString();
    const id = generateUniqueID();

    const newItem = [
      {
        id,
        name,
        amount,
        qtd: setDefaultQtd,
      },
    ];

    return itemsData.concat(newItem);
  }, [name, amount, qtd]);

  const onSaveButtonPress = useCallback(() => {
    try {
      canAddNewItem();

      const newItemsData = generateNewItemData();
      dispatch(setItemsData(newItemsData));
      navigation.goBack();
    } catch (e) {
      useErrorMessage(errorsString.error, e.message);
    }
  }, [name, amount, qtd]);

  return {
    name,
    setName,
    amount,
    setAmount,
    qtd,
    setQtd,
    qtdDefault,
    onSaveButtonPress,
  };
};

export default useNewProduct;
