import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { productListActions } from '@store/product-list';
import { ProductList } from '@store/product-list/types';
import useHeader from '@navigator/components/header/useHeader';

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
      if (listParams.id) {
        dispatch(productListActions.updateProductListAsync(listParams));
        return;
      }
      dispatch(productListActions.createProductListAsync(listParams));
      return;
    }
  }, [props]);

  useHeader({ showHeader: true });

  return {
    onAddPress,
  };
};

export default useNewList;
