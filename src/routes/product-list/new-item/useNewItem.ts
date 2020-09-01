import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';


import productListSelectors from '@store/product-list/selectors';
import { productListActions } from '@store/product-list';
import { ProductItemForm } from '@store/product-list/types';

interface Props {
  formParams: ProductItemForm;
  checkForm: () => Promise<boolean>;
  listId: string;
}
const useNewItem = (props: Props) => {
  const { checkForm, listId, formParams } = props;

  const dispatch = useDispatch();
  const isLoading = useSelector(productListSelectors.isLoading);

  const onSaveButtonPress = useCallback(async () => {
    const isValid = await checkForm();

    if (isValid) {
      dispatch(productListActions.setProductItemAsync(formParams, listId));
    }
  }, [formParams]);

  return {
    onSaveButtonPress,
    isLoading,
  };
};

export default useNewItem;
