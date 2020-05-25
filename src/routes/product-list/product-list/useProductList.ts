import { useEffect, useCallback, useState } from 'react';
import { ItemsDataArray } from '../store/types';
import { useSelector } from 'react-redux';
import { RootState } from '@store/reducers';
import { Props } from '.';

const useProductList = (props: Props) => {
  const itemsData = useSelector<RootState, ItemsDataArray>(
    (state) => state.productListReducers.itemsData,
  );
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

  useEffect(() => {
    handleSubTotal();
  }, [itemsData]);

  return { itemsData, onAddButtonPress, amountTotal, qtdTotal };
};

export default useProductList;
