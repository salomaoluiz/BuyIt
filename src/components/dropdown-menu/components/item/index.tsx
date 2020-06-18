import React from 'react';
import { GestureResponderEvent } from 'react-native';

import {
  Container,
  ListContainer,
  Text,
  IDContainer,
  ValueContainer,
} from './styles';
import { DropdownListItems } from '../../types';
import useItem from './useItem';

interface Props {
  listValues: DropdownListItems[];
  setValue: (value: string) => void;
  onDismissModal: (event: GestureResponderEvent) => void;
  selectedValue: string;
}
const MenuItem = (props: Props) => {
  const { listValues, setValue, selectedValue, onDismissModal } = props;

  const { handleSelectedItem } = useItem();
  return (
    <Container showsVerticalScrollIndicator={false}>
      {listValues.map((item) => {
        const onItemPress = (event: GestureResponderEvent) => {
          setValue(item.id);
          onDismissModal(event);
        };

        const { isFirst, isLast, isSelected } = handleSelectedItem(
          item,
          listValues,
          selectedValue,
        );

        return (
          <ListContainer
            key={item.id}
            onPress={onItemPress}
            isSelected={isSelected}
            isFirst={isFirst}
            isLast={isLast}>
            <IDContainer>
              <Text isSelected={isSelected}>{item.id}</Text>
            </IDContainer>
            <ValueContainer>
              <Text isSelected={isSelected}>{item.value}</Text>
            </ValueContainer>
          </ListContainer>
        );
      })}
    </Container>
  );
};

export default MenuItem;
