import { Props } from '.';
import { useCallback } from 'react';
import { Alert } from 'react-native';
import * as strings from '@locales/product-list';
import { ProductNavigatorParamsList } from '@navigator/product-navigator';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Routes } from '@routes';
import { useDispatch } from 'react-redux';
import { productListActions } from '@store/product-list';

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
    Alert.alert(strings.whatWant, strings.whatWantDo, [
      { text: strings.editItem, onPress: _handleEditItem },
      { text: strings.deleteItem, onPress: _handleDeleteItem },
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
