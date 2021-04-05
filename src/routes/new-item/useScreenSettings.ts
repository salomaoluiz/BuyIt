import { RouteProp, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';

import { translate } from '@locales';
import { ProductNavigatorParamsList } from '@navigator/product-navigator';

type Route = RouteProp<ProductNavigatorParamsList, 'NewListItem'>;

const useScreenSettings = () => {
  const [screenTitle, setScreenTitle] = useState(
    translate('productItems.newItem'),
  );

  const [fabIcon, setFabIcon] = useState('plus');

  const route = useRoute<Route>();
  const hasParams = !!route.params.productItem;

  useEffect(() => {
    if (hasParams) {
      setScreenTitle(translate('productItems.editItem'));
      setFabIcon('check');
    }
  }, [hasParams]);

  return {
    screenTitle,
    fabIcon,
  };
};

export default useScreenSettings;
