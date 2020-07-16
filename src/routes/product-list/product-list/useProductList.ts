import { useEffect, useCallback, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { Props } from '.';
import { Alert } from 'react-native';
import { filterByID, filterNotByID } from '@utils/filters';

import * as strings from '@locales/product-list';
import { productListSelectors, productListActions } from '@store/product-list';

const useProductList = (props: Props) => {
  const { productList } = useSelector(productListSelectors.getState);
  const dispatch = useDispatch();
  const [amountTotal, setAmountTotal] = useState<number>(0);
  const [qtdTotal, setQtdTotal] = useState<number>(0);

  const onAddButtonPress = useCallback(() => {
    props.navigation.navigate('NewProduct', {});
  }, []);

  const handleSubTotal = useCallback(() => {
    let totalAmount = 0;
    let totalQtd = 0;

    productList.forEach((item) => {
      totalAmount += parseFloat(item.amount);
      totalQtd += parseFloat(item.qtd);
    });

    setAmountTotal(totalAmount);
    setQtdTotal(totalQtd);
  }, [productList]);

  const handleEditItem = useCallback(
    (id: string) => {
      const filteredData = filterByID(productList, id);

      props.navigation.navigate('NewProduct', { productItem: filteredData });
    },
    [productList],
  );

  const handleDeleteItem = useCallback(
    (id: string) => {
      const filteredData = filterNotByID(productList, id);

      dispatch(productListActions.setProductList(filteredData));
    },
    [productList],
  );

  const onItemPress = useCallback(
    (id: string) => {
      const handlePress = {
        edit: () => handleEditItem(id),
        delete: () => handleDeleteItem(id),
      };

      Alert.alert(strings.whatWant, strings.whatWantDo, [
        { text: strings.editItem, onPress: handlePress.edit },
        { text: strings.deleteItem, onPress: handlePress.delete },
      ]);
    },
    [productList],
  );

  useEffect(() => {
    handleSubTotal();
  }, [productList]);

  return { productList, onAddButtonPress, amountTotal, qtdTotal, onItemPress };
};

export default useProductList;
