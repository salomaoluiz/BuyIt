/* eslint-disable no-unused-vars */
import * as React from 'react';
import { Button } from 'react-native';
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
import { ItemsData } from '../store/types';
import * as strings from '@locales/product-list';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamsList } from '@navigator';

export type Props = StackScreenProps<RootStackParamsList, 'ProductList'>;

const ProductList = (props: Props) => {
  const { itemsData, onAddButtonPress, amountTotal, qtdTotal } = useProductList(
    props,
  );

  const renderItem = ({ item, index }: { item: ItemsData; index: number }) => {
    return (
      <ItemContainer key={item.id}>
        <ItemText>{index}</ItemText>
        <ItemText>{item.name}</ItemText>
        <ItemText>{item.qtd}</ItemText>
        <ItemText>{item.amount}</ItemText>
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
  
  return (
    <Container>
      <ListContainer>
        {itemsData.map((item, index) => renderItem({ item, index }))}
      </ListContainer>
      <FooterContainer>
        {renderFooter()}
        <Button title="Add" onPress={onAddButtonPress} />
      </FooterContainer>
    </Container>
  );
};

export default ProductList;