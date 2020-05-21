import { useEffect, useCallback, useState } from 'react';
import { ItemsDataArray } from './store/types';
import { useSelector } from 'react-redux';
import { RootState } from '@store/reducers';

const useProductList = () => {
  const itemsData = useSelector<RootState, ItemsDataArray>(
    (state) => state.productListReducers.itemsData,
  );
  const [amountTotal, setAmountTotal] = useState<number>(0);
  const [qtdTotal, setQtdTotal] = useState<number>(0);

  const onAddButtonPress = useCallback(() => {
    console.log('ola');
  }, []);

  const handleSubTotal = useCallback(() => {
    let totalAmount = 0;
    let totalQtd = 0;
    itemsData.forEach((item) => {
      totalAmount += parseFloat(item.value);
      totalQtd += parseFloat(item.qtd);
    });

    setAmountTotal(totalAmount);
    setQtdTotal(totalQtd);
  }, [itemsData]);

  useEffect(() => {
    handleSubTotal();
  }, [handleSubTotal]);

  return { itemsData, onAddButtonPress, amountTotal, qtdTotal };
};

export default useProductList;
