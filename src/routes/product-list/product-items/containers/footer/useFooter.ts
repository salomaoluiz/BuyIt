import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useCallback, useState, useEffect } from 'react';

import { ProductNavigatorParamsList } from '@navigator/product-navigator';
import { Routes } from '@routes';
import { productListActions } from '@store/product-list';

import { Props } from './';

type NavProps = NavigationProp<ProductNavigatorParamsList, 'ProductItems'>;

const useFooter = (props: Props) => {
  const { productItems, listId } = props;
  const navigation = useNavigation<NavProps>();

  const [amountTotal, setAmountTotal] = useState(0);
  const [qtdTotal, setQtdTotal] = useState('');

  const handleSubTotal = useCallback(() => {
    let totalAmount = 0;
    let totalQtd = 0;
    if (productItems)
      productItems.forEach((item) => {
        totalAmount += parseFloat(item.amount);
        totalQtd += parseFloat(item.qtd);
      });

    setAmountTotal(parseFloat(totalAmount.toFixed(2)));
    setQtdTotal(totalQtd.toString());
  }, [productItems]);

  const onAddButtonPress = useCallback(() => {
    navigation.navigate(Routes.NewListItem, {
      listId,
      action: productListActions,
    });
  }, []);

  useEffect(() => {
    handleSubTotal();
  }, [productItems]);

  return {
    amountTotal,
    qtdTotal,
    onAddButtonPress,
  };
};

export default useFooter;
