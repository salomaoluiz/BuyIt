import React from 'react';

import ProductItemComponent from '@components/product-item';
import { ProductItem } from '@store/product-list/types';

import useItemCard from './useItemCard';

export interface Props {
  item: ProductItem;
  index: number;
}

const ItemCard = (props: Props) => {
  const { index, item } = props;
  const { handleDeleteItem, handleEditItem } = useItemCard(props);

  return (
    <ProductItemComponent
      productItem={item}
      index={index}
      onDeleteItem={handleDeleteItem}
      onEditItem={handleEditItem}
    />
  );
};

export default ItemCard;
