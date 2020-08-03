/* eslint-disable no-unused-vars */
import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, ItemContainer, ItemText, ListContainer } from './styles';
import useProductList from './useProductList';

import { StackScreenProps } from '@react-navigation/stack';
import { ProductNavigatorParamsList } from '@navigator/product-navigator';
import Footer from './containers/footer';
import Background from '@components/background';
import { colors } from '@styles';
import { ProductItem } from '@store/product-list/types';

export type Props = StackScreenProps<ProductNavigatorParamsList, 'ProductList'>;

const ProductList = (props: Props) => {
  const {
    productList,
    onAddButtonPress,
    amountTotal,
    qtdTotal,
    onItemPress,
  } = useProductList(props);

  const renderItem = ({
    item,
    index,
  }: {
    item: ProductItem;
    index: number;
  }) => {
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
    <Background color={colors.list.neutralMedium}>
      <Container>
        <ListContainer>
          {productList &&
            productList.map((item, index) => renderItem({ item, index }))}
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
