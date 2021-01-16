import { useCallback, useEffect, useState } from 'react';

import { PaperListData, Props } from './';

const useList = (props: Props) => {
  const [data, setData] = useState(props.data);
  const [selectedData] = useState<PaperListData[]>([]);

  useEffect(() => {
    props.selectedItems.forEach(({ id }) => {
      const itemFiltered = props.data.filter((item) => item.id === id)[0];
      selectedData.push({ ...itemFiltered, isSelected: true });
    });

    const newData = props.data.map((item) => {
      const filteredItem = selectedData.find(
        (selectedItem) => selectedItem.id === item.id,
      );

      if (filteredItem) return { ...filteredItem };

      return { ...item };
    });

    setData(newData);
  }, [props.data, props.selectedItems]);

  const handleItemPress = useCallback((item: PaperListData) => {
    const canSelectMultiple = props.checkMode && props.checkMode === 'checkbox';

    if (!canSelectMultiple) return props.onPress([item]);

    const newSelectedItems = selectedData.concat([
      { ...item, isSelected: true },
    ]);

    return props.onPress(newSelectedItems);
  }, []);

  return {
    data,
    handleItemPress,
  };
};

export default useList;
