import React from 'react';

import List, { PaperListData } from '@components/list';
import { translate } from '@locales';

import useUnitModal from './useUnitModal';

export interface Props {
  setUnit: (value: PaperListData) => void;
  unit?: PaperListData;
  handleModalVisible: (visible?: boolean) => void;
}

const UnitModal = (props: Props) => {
  const unitList: PaperListData[] = [
    { id: 'un', title: translate('unit.unit') },
    { id: 'ml', title: translate('unit.milliliter') },
    { id: 'L', title: translate('unit.liter') },
    { id: 'g', title: translate('unit.gram') },
    { id: 'Kg', title: translate('unit.kilogram') },
    { id: 'box', title: translate('unit.box') },
    { id: 'pack', title: translate('unit.pack') },
    { id: 'can', title: translate('unit.can') },
    { id: 'gallon', title: translate('unit.gallon') },
  ];

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
