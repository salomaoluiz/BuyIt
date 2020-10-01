import React from 'react';
import { Container, ListContainer } from './styles';
import useProductItems from './useProductItems';

import Footer from './containers/footer';
import ItemCard from './components/item-card';
import Header from '@components/header';
import appLocale from '@locales';

const strings = appLocale();

const ProductItems = () => {
  const { productItems, listId } = useProductItems();

  return (
    <>
      <Header title={strings.productLists.items} backButton/>
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
    </>
  );
};

export default ProductItems;
