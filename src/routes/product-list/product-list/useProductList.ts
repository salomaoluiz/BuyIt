import { useEffect, useCallback, useState } from 'react';
import { ItemsDataArray } from '../store/types';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@store/reducers';
import { Props } from '.';
import { Alert } from 'react-native';
import { filterByID, filterNotByID } from '@utils/filters';
import { setItemsData } from '../store/actions';

const useProductList = (props: Props) => {
  const itemsData = useSelector<RootState, ItemsDataArray>(
    (state) => state.productListReducers.itemsData,
  );
  const dispatch = useDispatch();
  const [amountTotal, setAmountTotal] = useState<number>(0);
  const [qtdTotal, setQtdTotal] = useState<number>(0);

  const onAddButtonPress = useCallback(() => {
    props.navigation.navigate('NewProduct');
  }, []);

  const handleSubTotal = useCallback(() => {
    let totalAmount = 0;
    let totalQtd = 0;

    itemsData.forEach((item) => {
      totalAmount += parseFloat(item.amount);
      totalQtd += parseFloat(item.qtd);
    });

    setAmountTotal(totalAmount);
    setQtdTotal(totalQtd);
  }, [itemsData]);

  const handleEditItem = useCallback(
    (id: string) => {
      const filteredData = filterByID(itemsData, id);

      props.navigation.navigate('NewProduct', { itemData: filteredData });
    },
    [itemsData],
  );

  const handleDeleteItem = useCallback(
    (id: string) => {
      const filteredData = filterNotByID(itemsData, id);

      dispatch(setItemsData(filteredData));
    },
    [itemsData],
  );

  const onItemPress = useCallback(
    (id: string) => {
      const handlePress = {
        edit: () => handleEditItem(id),
        delete: () => handleDeleteItem(id),
      };

      Alert.alert('O que desejas?', 'O que deseja fazer', [
        { text: 'Editar', onPress: handlePress.edit },
        { text: 'Apagar', onPress: handlePress.delete },
      ]);
    },
    [itemsData],
  );

  useEffect(() => {
    handleSubTotal();
  }, [itemsData]);

  return { itemsData, onAddButtonPress, amountTotal, qtdTotal, onItemPress };
};

export default useProductList;
