import appLocale from '@locales';
import { StockNavigatorParamsList } from '@navigator/stock-navigator';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Routes } from '@routes';
import { stockActions } from '@store/stock';
import { useCallback } from 'react';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { Props } from '.';

type NavProps = NavigationProp<StockNavigatorParamsList, 'Stock'>;

const strings = appLocale();

const useItemCard = (props: Props) => {
  const { item } = props;
  const navigation = useNavigation<NavProps>();
  const dispatch = useDispatch();

  const _handleEditItem = useCallback(() => {
    navigation.navigate(Routes.NewListItem, {
      productItem: item,
      action: stockActions,
    });
  }, [item]);

  const _handleDeleteItem = useCallback(() => {
    const itemId = item.id;
    dispatch(stockActions.deleteProductItemAsync(itemId));
  }, [item]);

  const handleItemPress = useCallback(() => {
    Alert.alert(strings.general.whatWant, strings.general.whatWantDo, [
      { text: strings.general.editItem, onPress: _handleEditItem },
      { text: strings.general.deleteItem, onPress: _handleDeleteItem },
    ]);
  }, [item]);
  return {
    handleItemPress,
    _handleDeleteItem,
    _handleEditItem,
  };
};

export default useItemCard;
