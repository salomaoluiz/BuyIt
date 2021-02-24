import React from 'react';

import Icon from '@components/icon';

import { Container, HasMoreContainer, ItemContainer, ItemText } from './styles';
import useAutoComplete from './useAutoComplete';

export type AutoCompleteData = { id: string; label: string };

export interface Props {
  data: AutoCompleteData[];
  onItemPress?: (id: AutoCompleteData) => void;
}

const AutoComplete = (props: Props) => {
  const { data } = props;
  const { handleItemPress, isVisible } = useAutoComplete(props);

  if (!isVisible) return null;
  return (
    <Container>
      {data.map((item, index, arr) => {
        const onPress = () => handleItemPress(item);
        if (index <= 4)
          return (
            <ItemContainer
              key={item.id}
              isLast={index === arr.length - 1 && arr.length <= 4}
              onPress={onPress}>
              <ItemText>{item.label}</ItemText>
            </ItemContainer>
          );
      })}
      {data.length > 4 && (
        <HasMoreContainer isLast disabled>
          <Icon isVisible name="dots-horizontal" disabled />
        </HasMoreContainer>
      )}
    </Container>
  );
};

export default AutoComplete;
