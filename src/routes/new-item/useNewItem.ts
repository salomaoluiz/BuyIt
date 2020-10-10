import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useState } from 'react';

import productListSelectors from '@store/product-list/selectors';
import { ProductItem } from '@store/product-list/types';
import { RouteProp, useRoute } from '@react-navigation/native';
import { ProductNavigatorParamsList } from '@navigator/product-navigator';

interface Props {
  formParams: Partial<ProductItem>;
  checkForm: () => Promise<boolean>;
}

type RouteProps = RouteProp<ProductNavigatorParamsList, 'NewListItem'>;

const useNewItem = (props: Props) => {
  const route = useRoute<RouteProps>();
  const { checkForm, formParams } = props;
  const { action, listId } = route.params;

  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();
  const isLoading = useSelector(productListSelectors.isLoading);

  const onSaveButtonPress = useCallback(async () => {
    const isValid = await checkForm();

    if (isValid) {
      if (formParams.id) {
        dispatch(action.updateProductItemAsync(formParams, listId));
        return;
      }

      dispatch(action.createProductItemAsync(formParams, listId));
      return;
    }
  }, [formParams]);

  const handleModalVisible = useCallback(
    (visible?: boolean) => {
      if (typeof visible === 'boolean') return setModalVisible(visible);

      return setModalVisible(!modalVisible);
    },
    [modalVisible],
  );

  return {
    onSaveButtonPress,
    isLoading,
    handleModalVisible,
    modalVisible,
  };
};

export default useNewItem;
