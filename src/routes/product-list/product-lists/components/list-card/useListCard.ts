import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useCallback, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';

import { translate } from '@locales';
import { ProductNavigatorParamsList } from '@navigator/product-navigator';
import { Routes } from '@routes';
import { productListActions } from '@store/product-list';

import { Props } from './';

type NavProps = NavigationProp<ProductNavigatorParamsList, 'ProductLists'>;

const useListCard = (props: Props) => {
  const { productList } = props;
  const [totalItems, setTotalItems] = useState(0);

  const navigation = useNavigation<NavProps>();
  const dispatch = useDispatch();

  const onListPress = useCallback(() => {
    const listId = productList.id;
    navigation.navigate(Routes.ProductItems, { listId });
  }, []);

  const _handleEditItem = useCallback(() => {
    navigation.navigate(Routes.NewList, { productList });
  }, [productList]);

  const _handleDeleteItem = useCallback(() => {
    const listId = productList.id;
    dispatch(productListActions.deleteList(listId));
  }, [productList]);

  const handleListLongPress = useCallback(() => {
    Alert.alert(
      translate('general.whatWant'),
      translate('general.whatWantDo'),
      [
        { text: translate('general.edit'), onPress: _handleEditItem },
        { text: translate('general.delete'), onPress: _handleDeleteItem },
      ],
    );
  }, [productList]);

  useEffect(() => {
    const qtdItems = productList.items?.length || 0;

    setTotalItems(qtdItems);
  }, [productList]);

  return {
    onListPress,
    productList,
    totalItems,
    handleListLongPress,
    _handleDeleteItem,
    _handleEditItem,
  };
};

export default useListCard;
