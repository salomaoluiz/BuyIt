import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { PaperListData } from '@components/list';
import { AutoCompleteData } from '@components/text-input/components/auto-complete';
import { toCurrency } from '@locales';
import { productListSelectors } from '@store/product-list';
import { ProductItem } from '@store/product-list/types';
import { stockSelectors } from '@store/stock';

interface SetParams {
  setBrand: React.Dispatch<React.SetStateAction<string>>;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setQtd: React.Dispatch<React.SetStateAction<string>>;
  setUnit: React.Dispatch<React.SetStateAction<PaperListData>>;
  setDueDate: React.Dispatch<React.SetStateAction<number | undefined>>;
  setBarcode: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const useItemStore = (props: {
  formParams: Partial<ProductItem>;
  setParams: SetParams;
}) => {
  const listItems = useSelector(productListSelectors.getAllItems);
  const listStock = useSelector(stockSelectors.getStock);
  const allItems = listItems.concat(listStock);
  const [storedPlaceholder, setStoredPlaceholder] = useState<
    AutoCompleteData[]
  >([]);
  const { formParams } = props;

  const {
    setBrand,
    setAmount,
    setName,
    setQtd,
    setUnit,
    setDueDate,
    setBarcode,
  } = props.setParams;

  useEffect(() => {
    if (formParams && formParams.name) {
      const typingItems = allItems
        .filter((item) =>
          item.name
            .toLocaleLowerCase()
            .includes(formParams.name?.toLocaleLowerCase() || ''),
        )
        .map((item) => ({
          id: item.id,
          label: `${item.name} - ${item.brand} - ${toCurrency(
            parseFloat(item.amount),
          )} - ${item.qtd}x${item.unit?.title}`,
        }));

      setStoredPlaceholder(typingItems);
    } else {
      setStoredPlaceholder([]);
    }
  }, [formParams.name]);

  const _setData = (selectedItem: ProductItem) => {
    setBrand(selectedItem.brand);
    setAmount(selectedItem.amount);
    setName(selectedItem.name);
    setQtd(selectedItem.qtd);
    setUnit(selectedItem.unit);
    setDueDate(selectedItem.dueDate);
    setBarcode(selectedItem.barcode);
  };

  const handleAutoCompleteItemPress = (selectedData: AutoCompleteData) => {
    const selectedItem = allItems.find((item) => item.id === selectedData.id);
    if (selectedItem) {
      _setData(selectedItem);
    }
  };

  const handleBarCodeDetected = (barcode: string) => {
    const selectedItem = allItems.find((item) => item.barcode === barcode);

    if (selectedItem) {
      _setData(selectedItem);
    } else {
      setBarcode(barcode);
    }
  };
  return {
    storedPlaceholder,
    handleBarCodeDetected,
    handleAutoCompleteItemPress,
  };
};

export default useItemStore;
