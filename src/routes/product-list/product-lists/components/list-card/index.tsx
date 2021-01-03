import React from 'react';

import { ProductList } from '@store/product-list/types';

import { Container, ListTitle } from './styles';
import useListCard from './useListCard';

export interface Props {
  productList: ProductList;
}
const ListCard = (props: Props) => {
  const {
    onListPress,
    productList,
    handleListLongPress,
  } = useListCard(props);

  const { name } = productList;
  return (
    <Container onPress={onListPress} onLongPress={handleListLongPress}>
      <ListTitle>{name}</ListTitle>
    </Container>
  );
};

export default ListCard;
