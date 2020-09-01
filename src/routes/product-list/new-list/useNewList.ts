import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { productListActions } from '@store/product-list';
import { ProductList } from '@store/product-list/types';

interface Props {
  listParams: Partial<ProductList>;
  checkForm: () => Promise<boolean>;
}
const useNewList = (props: Props) => {
  const { listParams, checkForm } = props;

  const dispatch = useDispatch();

  const onAddPress = useCallback(async () => {
    const canSubmit = await checkForm();
    if (canSubmit) {
      dispatch(productListActions.setProductListAsync(listParams));
    }
  }, [props]);

  return {
    onAddPress,
  };
};

export default useNewList;
