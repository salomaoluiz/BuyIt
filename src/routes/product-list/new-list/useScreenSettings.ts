import { RouteProp, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';

import { translate } from '@locales';
import { ProductNavigatorParamsList } from '@navigator/product-navigator';

type Route = RouteProp<ProductNavigatorParamsList, 'NewList'>;

const useScreenSettings = () => {
  const [screenTitle, setScreenTitle] = useState(
    translate('productLists.newList'),
  );

  const [fabIcon, setFabIcon] = useState('plus');

  const route = useRoute<Route>();
  const hasParams = !!route.params.productList;

  useEffect(() => {
    if (hasParams) {
      setScreenTitle(translate('productLists.editList'));
      setFabIcon('check');
    }
  }, [hasParams]);

  return {
    screenTitle,
    fabIcon,
  };
};

export default useScreenSettings;
