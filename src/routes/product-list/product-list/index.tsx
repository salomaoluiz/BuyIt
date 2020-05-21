/* eslint-disable no-unused-vars */
import * as React from 'react';
import { Button, FlatList } from 'react-native';
import {
  Container,
  ItemContainer,
  ItemText,
  SubTotalContainer,
  SubTotalText,
  ListContainer,
  FooterContainer,
} from './styles';
import useProductList from './useProductList';
import { ItemsData } from './store/types';
import * as strings from '@locales/list-items';

const ProductList = () => {
  const { itemsData, onAddButtonPress, amountTotal, qtdTotal } = useProductList();

  const renderItem = ({ item, index }: { item: ItemsData; index: number }) => {
    return (
      <ItemContainer>
        <ItemText>{index}</ItemText>
        <ItemText>{item.name}</ItemText>
        <ItemText>{item.qtd}</ItemText>
        <ItemText>{item.value}</ItemText>
      </ItemContainer>
    );
  };

  const renderFooter = () => {
    return (
      <SubTotalContainer>
        <SubTotalText>{strings.totalAmount(amountTotal)}</SubTotalText>
        <SubTotalText>{strings.totalQtd(qtdTotal)}</SubTotalText>
      </SubTotalContainer>
    );
  };

  const keyExtractor = (item: ItemsData) => item.key;
  return (
    <Container>
      <ListContainer>
        <FlatList<ItemsData>
          data={itemsData}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </ListContainer>
      <FooterContainer>
        {renderFooter()}
        <Button title="Add" onPress={onAddButtonPress} />
      </FooterContainer>
    </Container>
  );
};

export default ProductList;
