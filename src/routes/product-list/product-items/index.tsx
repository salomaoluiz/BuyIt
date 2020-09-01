import React from 'react';
import { Container, ListContainer } from './styles';
import useProductItems from './useProductItems';

import Footer from './containers/footer';
import Background from '@components/background';
import { colors } from '@styles';
import ItemCard from './components/item-card';

const ProductItems = () => {
  const { productItems, listId } = useProductItems();

  return (
    <Background color={colors.list.neutralMedium}>
      <Container>
        <ListContainer>
          {productItems &&
            productItems.map((item, index) => (
              <ItemCard
                key={item.id}
                itemIndex={index}
                listId={listId}
                productItem={item}
              />
            ))}
        </ListContainer>
      </Container>
      <Footer productItems={productItems} listId={listId} />
    </Background>
  );
};

export default ProductItems;
