/* eslint-disable no-unused-vars */
import * as React from 'react';
import { Button, TouchableOpacity } from 'react-native';
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
  const {
    itemsData,
    onAddButtonPress,
    amountTotal,
    qtdTotal,
    onItemPress,
  } = useProductList(props);

  console.log(itemsData);

  const renderItem = ({ item, index }: { item: ItemsData; index: number }) => {
    const handleItemPress = () => onItemPress(item.id);

    return (
      <TouchableOpacity key={item.id} onPress={handleItemPress}>
        <ItemContainer>
          <ItemText>{index}</ItemText>
          <ItemText>{item.name}</ItemText>
          <ItemText>{item.qtd}</ItemText>
          <ItemText>{item.amount}</ItemText>
        </ItemContainer>
      </TouchableOpacity>
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
