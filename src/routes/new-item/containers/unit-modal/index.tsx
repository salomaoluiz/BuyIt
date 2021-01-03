import React from 'react';

import List, { PaperListData } from '@components/list';

import { unitList } from '../../constants';
import useUnitModal from './useUnitModal';

export interface Props {
  setUnit: (value: PaperListData) => void;
  unit?: PaperListData;
  handleModalVisible: (visible?: boolean) => void;
}

const UnitModal = (props: Props) => {
  const { handleUnitSelect, units } = useUnitModal(props);

  return (
    <List
      data={unitList}
      onPress={handleUnitSelect}
      selectedItems={units}
      checkMode="radiobutton"
    />
  );
};

export default UnitModal;
