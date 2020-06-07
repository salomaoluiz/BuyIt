/* eslint-disable no-unused-vars */
import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, ItemContainer, ItemText, ListContainer } from './styles';
import useProductList from './useProductList';
import { ItemsData } from '../store/types';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamsList } from '@navigator';
import Footer from './containers/footer';
import Background from '@components/background';

export type Props = StackScreenProps<RootStackParamsList, 'ProductList'>;

const ProductList = (props: Props) => {
  const {
    itemsData,
    onAddButtonPress,
    amountTotal,
    qtdTotal,
    onItemPress,
  } = useProductList(props);

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

  return (
    <Background>
      <Container>
        <ListContainer>
          {itemsData.map((item, index) => renderItem({ item, index }))}
        </ListContainer>
      </Container>
      <Footer
        totalAmount={amountTotal}
        onAddPress={onAddButtonPress}
        totalQtd={qtdTotal}
      />
    </Background>
  );
};

export default ProductList;
