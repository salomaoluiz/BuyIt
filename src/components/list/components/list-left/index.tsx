import React from 'react';
import { List as PaperList } from 'react-native-paper';

import { ListCheckMode } from '../../';

interface Props {
  leftProps: {
    color: string;
    style: {
      marginLeft: number;
      marginRight: number;
      marginVertical?: number | undefined;
    };
  };
  icon?: string;
  isSelected?: boolean;
  checkMode?: ListCheckMode;
}

const ListLeft = (props: Props) => {
  const { checkMode, icon, leftProps, isSelected } = props;

  if (!icon && !checkMode) return null;

  const checkIcons = {
    radiobutton: {
      isSelected: 'checkbox-marked-circle',
      notSelected: 'checkbox-blank-circle-outline',
    },
    checkbox: {
      isSelected: 'checkbox-marked',
      notSelected: 'checkbox-blank-outline',
    },
  };

  const showIcon = icon
    ? icon
    : isSelected
    ? checkIcons[checkMode!].isSelected
    : checkIcons[checkMode!].notSelected;

  return <PaperList.Icon {...leftProps} icon={showIcon} />;
};

export default ListLeft;
