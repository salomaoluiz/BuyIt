import React from 'react';

import { Container, ButtonContainer } from './styles';
import useProductLists from './useProductLists';
import ListCard from './components/list-card';
import { StackScreenProps } from '@react-navigation/stack';
import { ProductNavigatorParamsList } from '@navigator/product-navigator';
import { FlatList } from 'react-native';
import { ProductList } from '@store/product-list/types';
import CircleButton from '@components/circle-button';

export type Props = StackScreenProps<
  ProductNavigatorParamsList,
  'ProductLists'
>;

const ProductLists = (props: Props) => {
  const { productLists, onNewButtonPress } = useProductLists(props);

  const renderItem = ({ item }: { item: ProductList }) => (
    <ListCard key={item.id} productList={item} />
  );

  return (
    <Container>
      <FlatList data={productLists} renderItem={renderItem} numColumns={2} />

      <ButtonContainer behavior="position" keyboardVerticalOffset={40}>
        <CircleButton icon="plus" onPress={onNewButtonPress} />
      </ButtonContainer>
    </Container>
  );
};

export default ProductLists;
