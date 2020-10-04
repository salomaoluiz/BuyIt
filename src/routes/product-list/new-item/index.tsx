import * as React from 'react';
import useNewItem from './useNewItem';
import {
  Container,
  SubContainer,
  ButtonContainer,
  TwoColumnsContainer,
} from './styles';
import TextInput from '@components/text-input';
import useForm from './useForm';
import CircleButton from '@components/FAB';
import appLocale, { appCurrency } from '@locales';
import Header from '@components/header';
import TouchableRipple from '@components/touchable-ripple';
import Divider from '@components/divider';
import UnitModal from './containers/unit-modal';
import Dialog from '@components/dialog';
import { Portal } from 'react-native-paper';

const strings = appLocale();
const currency = appCurrency();

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

  const { onSaveButtonPress, handleModalVisible, modalVisible } = useNewItem({
    formParams,
    checkForm,
    listId,
  });

  return (
    <>
      <Header title={strings.productLists.newItem} backButton />
      <Container>
        <SubContainer>
          <TextInput
            value={name}
            label={strings.general.name}
            onChangeText={setName}
            {...handleErrorMessage('name')}
          />
          <Divider columnDivider />
          <TextInput
            value={brand}
            label={strings.productLists.brand}
            onChangeText={setBrand}
            {...handleErrorMessage('brand')}
          />
          <Divider columnDivider />
          <TextInput
            value={amount}
            leftIcon="currency-usd"
            onChangeText={setAmount}
            label={strings.productLists.amount}
            prefix={currency}
            keyboardType="decimal-pad"
            {...handleErrorMessage('amount')}
          />
          <Divider columnDivider />
          <TwoColumnsContainer>
            <TextInput
              value={qtd}
              label={strings.productLists.qtd}
              onChangeText={setQtd}
              leftIcon="cart-outline"
              keyboardType="decimal-pad"
              {...handleErrorMessage('qtd')}
            />
            <Divider rowDivider />
            <TouchableRipple withoutBackground onPress={handleModalVisible}>
              <TextInput
                editable={false}
                fixedValue={unit && unit.title}
                label={strings.unit.unit}
                {...handleErrorMessage('unit')}
              />
            </TouchableRipple>
          </TwoColumnsContainer>
        </SubContainer>
      </Container>
      <ButtonContainer>
        <CircleButton icon="check" onPress={onSaveButtonPress} />
      </ButtonContainer>

      <Portal>
        <Dialog
          onDismiss={handleModalVisible}
          isVisible={modalVisible}
          hasCancelButton
          scrollable>
          <UnitModal
            setUnit={setUnit}
            unit={unit}
            handleModalVisible={handleModalVisible}
          />
        </Dialog>
      </Portal>
    </>
  );
};

export default NewItem;
