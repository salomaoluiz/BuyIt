import { StockNavigatorParamsList } from '@navigator/stock-navigator';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Routes } from '@routes';
import { stockActions } from '@store/stock';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Props } from '.';

type NavProps = NavigationProp<StockNavigatorParamsList, 'Stock'>;

const useItemCard = (props: Props) => {
  const { item } = props;
  const navigation = useNavigation<NavProps>();
  const dispatch = useDispatch();

  const handleEditItem = useCallback(() => {
    navigation.navigate(Routes.NewListItem, {
      productItem: item,
      action: stockActions,
    });
  }, [item]);

  const handleDeleteItem = useCallback(() => {
    const itemId = item.id;
    dispatch(stockActions.deleteProductItemAsync(itemId));
  }, [item]);

  return {
    handleDeleteItem,
    handleEditItem,
  };
};

export default useItemCard;
