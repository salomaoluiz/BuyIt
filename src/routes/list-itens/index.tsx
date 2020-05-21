/* eslint-disable no-unused-vars */
import * as React from 'react';
import { connect } from 'react-redux';
import { Button, FlatList } from 'react-native';
import { RootState } from '@store/reducers';
import { setLoader } from '@store/general-store/ui-actions';
import {
  Container,
  ItemContainer,
  ItemText,
  SubTotalContainer,
  SubTotalText,
  ListContainer,
  FooterContainer,
} from './styles';
import useListItems from './useListItems';
import { ItemsData } from './store/types';
import * as strings from '@locales/list-items';

// #region Redux & Props

const mapState = (state: RootState) => ({
  uiLoading: state.uiReducer.loading,
});

const mapDispatch = {
  setLoader,
};

const connector = connect(mapState, mapDispatch);

// type PropsFromRedux = ConnectedProps<typeof connector>;

// interface Props extends PropsFromRedux {
//   navigation: StackNavigationProp<{}>;
// }

// #endregion

const ListItens = () => {
  const { itemsData, onAddButtonPress, amountTotal, qtdTotal } = useListItems();

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

export default connector(ListItens);
