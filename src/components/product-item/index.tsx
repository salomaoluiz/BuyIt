import React from 'react';

import { ProductItem } from '@store/product-list/types';
import { ItemContainer, ItemText, ItemButton } from './styles';

interface Props {
  onPress: () => void;
  index: number;
  productItem: ProductItem;
}

const ProductItemComponent = (props: Props) => {
  const { onPress, index, productItem } = props;
  return (
    <ItemButton onPress={onPress}>
      <ItemContainer>
        <ItemText>{index}</ItemText>
        <ItemText>{productItem.name}</ItemText>
        <ItemText>{productItem.qtd}</ItemText>
        <ItemText>{productItem.amount}</ItemText>
      </ItemContainer>
    </ItemButton>
  );
};

export default ProductItemComponent;
