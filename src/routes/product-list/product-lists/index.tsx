import React from 'react';

import { Container, ButtonContainer } from './styles';
import useProductLists from './useProductLists';
import ListCard from './components/list-card';

import { FlatList } from 'react-native';
import { ProductList } from '@store/product-list/types';
import CircleButton from '@components/FAB';
import Header from '@components/header';
import appLocale from '@locales';

const strings = appLocale();

const ProductLists = () => {
  const { ordenedList, onNewButtonPress } = useProductLists();

  const renderItem = ({ item }: { item: ProductList }) => (
    <ListCard key={item.id} productList={item} />
  );

  return (
    <Container>
      <Header title={strings.productLists.lists} drawerButton />
      <FlatList data={ordenedList} renderItem={renderItem} numColumns={2} />

      <ButtonContainer behavior="position" keyboardVerticalOffset={40}>
        <CircleButton icon="plus" onPress={onNewButtonPress} />
      </ButtonContainer>
    </Container>
  );
};

export default ProductLists;
