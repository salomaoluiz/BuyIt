import * as React from 'react';

import * as strings from '@locales/product-list';

import useNewItem from './useNewItem';
import { Container, TwoColumnsContainer, SubContainer, ButtonContainer } from './styles';
import TextInput from '@components/text-input';
import Background from '@components/background';
import DropdownMenu from '@components/dropdown-menu';
import { unitList } from './constants';
import useForm from './useForm';
import CircleButton from '@components/circle-button';

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
            title={strings.name}
            onChangeText={setName}
            {...handleErrorMessage('name')}
          />
          <TextInput
            value={brand}
            title={strings.brand}
            onChangeText={setBrand}
            {...handleErrorMessage('brand')}
          />
          <TextInput
            value={amount}
            icon="currency-usd"
            onChangeText={setAmount}
            title={strings.amount}
            prefix={strings.currentCurrency}
            keyboardType="decimal-pad"
            {...handleErrorMessage('amount')}
          />
          <TwoColumnsContainer>
            <TextInput
              value={qtd}
              title={strings.qtd}
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
