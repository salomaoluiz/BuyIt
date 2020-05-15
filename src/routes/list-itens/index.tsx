/* eslint-disable no-unused-vars */
import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { View, Text } from 'react-native';
import { RootState } from '@store/reducers';
import { setLoader } from '@store/general-store/ui-actions';
import { StackNavigationProp } from '@react-navigation/stack';

const mapState = (state: RootState) => ({
  uiLoading: state.uiReducer.loading,
});

const mapDispatch = {
  setLoader,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {
  navigation: StackNavigationProp<{}>;
}

const ListItens = (props: Props) => {
  return (
    <View>
      <Text>{props.uiLoading ? 'Carregando' : 'Não Carregando'}</Text>
    </View>
  );
};

export default connector(ListItens);
