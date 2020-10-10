import React from 'react';
import { ProductItem } from '@store/product-list/types';
import useItemCard from './useItemCard';
import ProductItemComponent from '@components/product-item';

export interface Props {
  listId: string;
  itemIndex: number;
  productItem: ProductItem;
}

const ItemCard = (props: Props) => {
  const { productItem, handleItemPress, itemIndex } = useItemCard(props);
  return (
    <ProductItemComponent
      index={itemIndex}
      onPress={handleItemPress}
      productItem={productItem}
    />
  );
};

export default ItemCard;
