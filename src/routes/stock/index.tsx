import React from 'react';
import { FlatList } from 'react-native';
import Header from '@components/header';
import appLocale from '@locales';
import FABButton from '@components/FAB';
import { ButtonContainer } from './styles';
import useStock from './useStock';
import ItemCard from './components/item-card';

const strings = appLocale();
const Stock = () => {
  const { handleAddButtonPress, stockData } = useStock();

  return (
    <>
      <Header title={strings.stock.stock} drawerButton />
      <FlatList
        data={stockData}
        renderItem={({ index, item }) => <ItemCard item={item} index={index} />}
      />
      <ButtonContainer>
        <FABButton icon="plus" onPress={handleAddButtonPress} />
      </ButtonContainer>
    </>
  );
};

export default Stock;
