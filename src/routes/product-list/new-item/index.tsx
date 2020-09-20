import * as React from 'react';
import useNewItem from './useNewItem';
import {
  Container,
  TwoColumnsContainer,
  SubContainer,
  ButtonContainer,
} from './styles';
import TextInput from '@components/text-input';
import Background from '@components/background';
import DropdownMenu from '@components/dropdown-menu';
import { unitList } from './constants';
import useForm from './useForm';
import CircleButton from '@components/circle-button';
import appLocale, { appCurrency } from '@locales';

const strings = appLocale();
const { currency } = appCurrency();

const NewItem = () => {
  const {
    formParams,
    setBrand,
    setAmount,
    setName,
    setQtd,
    handleErrorMessage,
    setUnit,
    checkForm,
    listId,
  } = useForm();
  const { amount, brand, name, qtd, unit } = formParams;

  const { onSaveButtonPress } = useNewItem({
    formParams,
    checkForm,
    listId,
  });

  return (
    <Background>
      <Container>
        <SubContainer>
          <TextInput
            value={name}
            title={strings.general.name}
            onChangeText={setName}
            {...handleErrorMessage('name')}
          />
          <TextInput
            value={brand}
            title={strings.productLists.brand}
            onChangeText={setBrand}
            {...handleErrorMessage('brand')}
          />
          <TextInput
            value={amount}
            icon="currency-usd"
            onChangeText={setAmount}
            title={strings.productLists.amount}
            prefix={currency}
            keyboardType="decimal-pad"
            {...handleErrorMessage('amount')}
          />
          <TwoColumnsContainer>
            <TextInput
              value={qtd}
              title={strings.productLists.qtd}
              onChangeText={setQtd}
              icon="cart-outline"
              keyboardType="decimal-pad"
              {...handleErrorMessage('qtd')}
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
      <ButtonContainer>
        <CircleButton icon="check" onPress={onSaveButtonPress} />
      </ButtonContainer>
    </Background>
  );
};

export default NewItem;
