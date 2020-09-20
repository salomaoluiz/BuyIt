import { Props } from '.';
import { useCallback } from 'react';
import { Alert } from 'react-native';
import { ProductNavigatorParamsList } from '@navigator/product-navigator';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Routes } from '@routes';
import { useDispatch } from 'react-redux';
import { productListActions } from '@store/product-list';
import appLocale from '@locales';

const strings = appLocale();
type NavProps = NavigationProp<ProductNavigatorParamsList, 'ProductItems'>;

const useItemCard = (props: Props) => {
  const { productItem, listId, itemIndex } = props;
  const navigation = useNavigation<NavProps>();
  const dispatch = useDispatch();

  const _handleEditItem = useCallback(() => {
    navigation.navigate(Routes.NewListItem, {
      productItem,
      listId,
    });
  }, [productItem]);

  const _handleDeleteItem = useCallback(() => {
    const itemId = productItem.id;
    dispatch(productListActions.deleteProductItemAsync(itemId, listId));
  }, [productItem]);

  const handleItemPress = useCallback(() => {
    Alert.alert(strings.general.whatWant, strings.general.whatWantDo, [
      { text: strings.general.editItem, onPress: _handleEditItem },
      { text: strings.general.deleteItem, onPress: _handleDeleteItem },
    ]);
  }, [productItem]);

  return {
    _handleDeleteItem,
    _handleEditItem,
    productItem,
    itemIndex,
    handleItemPress,
  };
};

export default useItemCard;
