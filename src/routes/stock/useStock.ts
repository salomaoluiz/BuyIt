import { useNavigation } from '@react-navigation/native';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Routes } from '@routes';
import { stockActions, stockSelectors } from '@store/stock';

const useStock = () => {
  const isLoading = useSelector(stockSelectors.isLoading);
  const stockData = useSelector(stockSelectors.getStock);
  const { navigate } = useNavigation();

  const dispatch = useDispatch();

  const fetchStockData = useCallback(() => {
    dispatch(stockActions.requestStock());
  }, []);

  const handleAddButtonPress = useCallback(() => {
    navigate(Routes.NewListItem, { action: stockActions });
  }, []);

  useEffect(() => {
    fetchStockData();
  }, []);

  return {
    isLoading,
    stockData,
    handleAddButtonPress,
  };
};

export default useStock;
