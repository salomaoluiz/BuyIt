import React from 'react';

import { ProductItem } from '@store/product-list/types';
import ProductItemComponent from '@components/product-item';
import useItemCard from './useItemCard';

export interface Props {
  item: ProductItem;
  index: number;
}

const ItemCard = (props: Props) => {
  const { index, item } = props;
  const { handleItemPress } = useItemCard(props);

  return (
    <ProductItemComponent
      productItem={item}
      index={index}
      onPress={handleItemPress}
    />
  );
};

export default ItemCard;
