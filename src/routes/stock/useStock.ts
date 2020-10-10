import { useNavigation } from '@react-navigation/native';
import { Routes } from '@routes';
import { stockActions, stockSelectors } from '@store/stock';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useStock = () => {
  const isLoading = useSelector(stockSelectors.isLoading);
  const stockData = useSelector(stockSelectors.getStock);
  const { navigate } = useNavigation();

  const dispatch = useDispatch();

  const fetchStockData = useCallback(() => {
    dispatch(stockActions.getStockAsync());
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
