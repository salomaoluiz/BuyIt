import { Props } from '.';
import { useCallback } from 'react';
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

  const handleEditItem = useCallback(() => {
    navigation.navigate(Routes.NewListItem, {
      productItem,
      listId,
      action: productListActions,
    });
  }, [productItem]);

  const handleDeleteItem = useCallback(() => {
    const itemId = productItem.id;
    dispatch(productListActions.deleteProductItemAsync(itemId, listId));
  }, [productItem]);

  return {
    handleDeleteItem,
    handleEditItem,
    productItem,
    itemIndex,
  };
};

export default useItemCard;
