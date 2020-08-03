import * as React from 'react';

import { StackScreenProps } from '@react-navigation/stack';
import { ProductNavigatorParamsList } from '@navigator/product-navigator';
import * as strings from '@locales/product-list';

import useNewProduct from './useNewProduct';
import { Container, TwoColumnsContainer, SubContainer } from './styles';
import TextInput from '@components/text-input';
import Background from '@components/background';
import Icon from '@components/icon';
import { colors } from '@styles';
import DropdownMenu from '@components/dropdown-menu';
import { unitList } from './constants';

export type Props = StackScreenProps<ProductNavigatorParamsList, 'NewProduct'>;

const NewProduct = (props: Props) => {
  const {
    amount,
    name,
    qtd,
    brand,
    setBrand,
    setAmount,
    setName,
    setQtd,
    onSaveButtonPress,
    handleFindError,
    setUnit,
    unit,
  } = useNewProduct(props);

  props.navigation.setOptions({
    headerRight: () => (
      <Icon
        name="check"
        isVisible={true}
        onPress={onSaveButtonPress}
        color={colors.list.neutralDarkest}
      />
    ),
  });

  return (
    <Background>
      <Container>
        <SubContainer>
          <TextInput
            value={name}
            title={strings.name}
            onChangeText={setName}
            {...handleFindError('name')}
          />
          <TextInput
            value={brand}
            title={strings.brand}
            onChangeText={setBrand}
            {...handleFindError('brand')}
          />
          <TextInput
            value={amount}
            icon="currency-usd"
            onChangeText={setAmount}
            title={strings.amount}
            prefix={strings.currentCurrency}
            keyboardType="decimal-pad"
            {...handleFindError('amount')}
          />
          <TwoColumnsContainer>
            <TextInput
              value={qtd}
              title={strings.qtd}
              onChangeText={setQtd}
              icon="cart-outline"
              keyboardType="decimal-pad"
              {...handleFindError('qtd')}
            />

            <DropdownMenu
              title="Unidade"
              icon="file-document-outline"
              listValues={unitList}
              setValue={setUnit}
              selectedValue={unit}
            />
          </TwoColumnsContainer>
        </SubContainer>
      </Container>
    </Background>
  );
};

export default NewProduct;
