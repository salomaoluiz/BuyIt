import { useCallback, useState } from 'react';
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
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const { showAd } = useInterstitialAd();
  const dispatch = useDispatch();

  const onAddPress = useCallback(async () => {
    const canSubmit = await checkForm();
    if (canSubmit) {
      if (listParams.id) {
        dispatch(productListActions.updateList(listParams));
        return;
      }
      dispatch(productListActions.createList(listParams));
      showAd();
      return;
    }
  }, [props]);

  const handleDatePickerVisible = (isVisible?: boolean) => {
    if (typeof isVisible === 'boolean') return setDatePickerVisible(isVisible);
    return setDatePickerVisible(!datePickerVisible);
  };

  return {
    onAddPress,
    datePickerVisible,
    handleDatePickerVisible,
  };
};

export default useNewList;
