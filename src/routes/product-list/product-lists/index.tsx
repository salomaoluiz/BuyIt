import React from 'react';

import { Container, ButtonContainer } from './styles';
import useProductLists from './useProductLists';
import ListCard from './components/list-card';

import { FlatList } from 'react-native';
import { ProductList } from '@store/product-list/types';
import CircleButton from '@components/circle-button';

const ProductLists = () => {
  const {
    productLists,
    onNewButtonPress,
  } = useProductLists();

  const renderItem = ({ item }: { item: ProductList }) => (
    <ListCard key={item.id} productList={item} />
  );

  return (
    <Container>
      <FlatList
        data={productLists}
        renderItem={renderItem}
        numColumns={2}
      />

      <ButtonContainer behavior="position" keyboardVerticalOffset={40}>
        <CircleButton icon="plus" onPress={onNewButtonPress} />
      </ButtonContainer>
    </Container>
  );
};

export default ProductLists;
