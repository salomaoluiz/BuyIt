import React from 'react';
import { Container } from './styles';
import useProductItems from './useProductItems';

import Footer from './containers/footer';
import ItemCard from './components/item-card';
import Header from '@components/header';
import appLocale from '@locales';
import { ProductItem } from '@store/product-list/types';
import { FlatList } from 'react-native';

const strings = appLocale();

const ProductItems = () => {
  const { ordenedList, listId } = useProductItems();

  const renderItem = ({
    item,
    index,
  }: {
    item: ProductItem;
    index: number;
  }) => {
    return <ItemCard itemIndex={index} listId={listId} productItem={item} />;
  };
  return (
    <>
      <Header title={strings.productItems.items} backButton />
      <Container>
        <FlatList
          data={ordenedList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          overScrollMode="never"
        />
      </Container>
      <Footer productItems={ordenedList} listId={listId} />
    </>
  );
};

export default ProductItems;
