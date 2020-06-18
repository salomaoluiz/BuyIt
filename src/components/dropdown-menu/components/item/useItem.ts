import { useCallback } from 'react';
import { DropdownListItems } from '@components/dropdown-menu/types';

const useItem = () => {
  const handleSelectedItem = useCallback(
    (
      item: DropdownListItems,
      listItems: DropdownListItems[],
      selectedValue: string,
    ) => {
      const isSelected = selectedValue === item.id;
      const isFirst = item.id === listItems[0].id;
      const lastIndex = listItems.length - 1;
      const isLast = item.id === listItems[lastIndex].id;

      return {
        isSelected,
        isFirst,
        isLast,
      };
    },
    [],
  );

  return { handleSelectedItem };
};

export default useItem;
