import React from 'react';
import { ItemContainer, ItemText, ItemButton } from './styles';
import { ProductItem } from '@store/product-list/types';
import useItemCard from './useItemCard';

export interface Props {
  listId: string;
  itemIndex: number;
  productItem: ProductItem;
}

const ItemCard = (props: Props) => {
  const { productItem, handleItemPress, itemIndex } = useItemCard(props);
  return (
    <ItemButton onPress={handleItemPress}>
      <ItemContainer>
        <ItemText>{itemIndex}</ItemText>
        <ItemText>{productItem.name}</ItemText>
        <ItemText>{productItem.qtd}</ItemText>
        <ItemText>{productItem.amount}</ItemText>
      </ItemContainer>
    </ItemButton>
  );
};

export default ItemCard;
