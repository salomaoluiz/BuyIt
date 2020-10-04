import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { productListActions } from '@store/product-list';
import { ProductList } from '@store/product-list/types';
import { useInterstitialAd } from 'src/firebase/admob';

interface Props {
  listParams: Partial<ProductList>;
  checkForm: () => Promise<boolean>;
}
const useNewList = (props: Props) => {
  const { listParams, checkForm } = props;
  const { showAd } = useInterstitialAd();
  const dispatch = useDispatch();

  const onAddPress = useCallback(async () => {
    const canSubmit = await checkForm();
    if (canSubmit) {
      if (listParams.id) {
        dispatch(productListActions.updateProductListAsync(listParams));
        return;
      }
      dispatch(productListActions.createProductListAsync(listParams));
      showAd();
      return;
    }
  }, [props]);

  return {
    onAddPress,
  };
};

export default useNewList;
