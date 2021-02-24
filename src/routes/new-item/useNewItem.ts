import { RouteProp, useRoute } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ProductNavigatorParamsList } from '@navigator/product-navigator';
import { productListSelectors } from '@store/product-list';
import { ProductItem } from '@store/product-list/types';

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
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [barcodeCameraVisible, setBarcodeCameraVisible] = useState(false);

  const dispatch = useDispatch();
  const isLoading = useSelector(productListSelectors.isLoading);

  const onSaveButtonPress = useCallback(async () => {
    const isValid = await checkForm();

    if (isValid) {
      if (formParams.id) {
        dispatch(action.updateItem(formParams, listId));
        return;
      }
      dispatch(action.createItem(formParams, listId));
    }
  }, [formParams]);

  const handleModalVisible = useCallback(
    (visible?: boolean) => {
      if (typeof visible === 'boolean') return setModalVisible(visible);

      return setModalVisible(!modalVisible);
    },
    [modalVisible],
  );

  const handleDatePickerVisible = (visible?: boolean) => {
    if (typeof visible === 'boolean') return setDatePickerVisible(visible);

    return setDatePickerVisible(!datePickerVisible);
  };

  const handleBarcodeCameraVisibility = (visible?: boolean) => {
    if (typeof visible === 'boolean') return setBarcodeCameraVisible(visible);

    return setBarcodeCameraVisible(!barcodeCameraVisible);
  };

  return {
    onSaveButtonPress,
    isLoading,
    handleModalVisible,
    modalVisible,
    datePickerVisible,
    handleDatePickerVisible,
    handleBarcodeCameraVisibility,
    barcodeCameraVisible,
  };
};

export default useNewItem;
