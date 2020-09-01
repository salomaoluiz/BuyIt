import React from 'react';
import { ProductList } from '@store/product-list/types';
import { Container, ListTitle, ListItems } from './styles';
import useListCard from './useListCard';

export interface Props {
  productList: ProductList;
}
const ListCard = (props: Props) => {
  const {
    onListPress,
    productList,
    handleListLongPress,
    totalItems,
  } = useListCard(props);

  const { name } = productList;
  return (
    <Container onPress={onListPress} onLongPress={handleListLongPress}>
      <ListTitle>{name}</ListTitle>
      <ListItems>{totalItems}</ListItems>
    </Container>
  );
};

export default ListCard;
