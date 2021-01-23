import React from 'react';
import { FlatList } from 'react-native';

import Header from '@components/header';
import { translate } from '@locales';
import { ProductItem } from '@store/product-list/types';

import ItemCard from './components/item-card';
import Footer from './containers/footer';
import { Container } from './styles';
import useProductItems from './useProductItems';

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
      <Header title={translate('productItems.items')} backButton />
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
