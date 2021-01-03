import { useCallback, useState } from 'react';

import { PaperListData } from '@components/list';

import { Props } from './';

const useUnitModal = (props: Props) => {
  const [units] = useState(props.unit ? [props.unit] : []);

  const handleUnitSelect = useCallback(
    (unit: PaperListData[]) => {
      props.setUnit(unit[0]);
      props.handleModalVisible(false);
    },
    [props.unit],
  );

  return { handleUnitSelect, units };
};

export default useUnitModal;
