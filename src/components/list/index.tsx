import React from 'react';
import { List as PaperList } from 'react-native-paper';

import ListLeft from './components/list-left';
import ListRight from './components/list-right';
import useList from './useList';

export type ListCheckMode = 'radiobutton' | 'checkbox';

export interface RightIcon {
  icon: string;
  onPress: () => void;
}

export interface PaperListData {
  id: string;
  title: string;
  describe?: string;
  icon?: string;
  isSelected?: boolean;
  rightIcon?: RightIcon;
}

export interface Props {
  data: PaperListData[];
  checkMode?: ListCheckMode;
  selectedItems: PaperListData[];
  onPress: (item: PaperListData[]) => void;
}

const List = (props: Props) => {
  const { data, handleItemPress } = useList(props);

  return (
    <>
      {data.map((item) => {
        const handlePress = () => {
          handleItemPress(item);
        };
        return (
          <PaperList.Item
            key={item.id}
            title={item.title}
            onPress={handlePress}
            left={(leftProps) => (
              <ListLeft
                leftProps={leftProps}
                checkMode={props.checkMode}
                icon={item.icon}
                isSelected={item.isSelected}
              />
            )}
            right={(rightProps) => (
              <ListRight rightProps={rightProps} rightIcon={item.rightIcon} />
            )}
          />
        );
      })}
    </>
  );
};

export default List;
