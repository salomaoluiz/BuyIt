import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useState } from 'react';

import productListSelectors from '@store/product-list/selectors';
import { productListActions } from '@store/product-list';
import { ProductItem } from '@store/product-list/types';

interface Props {
  formParams: Partial<ProductItem>;
  checkForm: () => Promise<boolean>;
  listId: string;
}
const useNewItem = (props: Props) => {
  const { checkForm, listId, formParams } = props;
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();
  const isLoading = useSelector(productListSelectors.isLoading);

  const onSaveButtonPress = useCallback(async () => {
    const isValid = await checkForm();

    if (isValid) {
      if (formParams.id) {
        dispatch(productListActions.updateProductItemAsync(formParams, listId));
        return;
      }

      dispatch(productListActions.createProductItemAsync(formParams, listId));
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
