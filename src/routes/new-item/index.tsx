import * as React from 'react';
import { Portal } from 'react-native-paper';

import BarcodeCamera from '@components/barcode-camera';
import Dialog from '@components/dialog';
import Divider from '@components/divider';
import CircleButton from '@components/FAB';
import Header from '@components/header';
import TextInput from '@components/text-input';
import TouchableRipple from '@components/touchable-ripple';
import appLocale, { appCurrency } from '@locales';
import { formatDate } from '@utils/date';

import BarcodeContainer from './containers/barcode';
import DueDateModal from './containers/duedate-modal';
import UnitModal from './containers/unit-modal';
import {
  Container,
  SubContainer,
  ButtonContainer,
  TwoColumnsContainer,
} from './styles';
import useForm from './useForm';
import useNewItem from './useNewItem';

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
    setDueDate,
    setBarcode,
  } = useForm();
  const { amount, brand, name, qtd, unit, dueDate, barcode } = formParams;

  const {
    onSaveButtonPress,
    handleModalVisible,
    modalVisible,
    datePickerVisible,
    handleDatePickerVisible,
    handleBarcodeCameraVisibility,
    barcodeCameraVisible,
  } = useNewItem({
    formParams,
    checkForm,
  });

  return (
    <>
      <Header title={strings.productItems.newItem} backButton />
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
            label={strings.productItems.brand}
            onChangeText={setBrand}
            {...handleErrorMessage('brand')}
          />
          <Divider columnDivider />
          <TwoColumnsContainer>
            <TextInput
              value={amount}
              leftIcon="currency-usd"
              onChangeText={setAmount}
              label={strings.productItems.amount}
              prefix={currency}
              keyboardType="decimal-pad"
              {...handleErrorMessage('amount')}
            />
            <Divider columnDivider rowDivider />
            <TouchableRipple
              withoutBackground
              onPress={handleDatePickerVisible}>
              <TextInput
                editable={false}
                fixedValue={dueDate && formatDate(dueDate)}
                label={strings.productItems.dueDate}
                {...handleErrorMessage('dueDate')}
              />
            </TouchableRipple>
          </TwoColumnsContainer>
          <Divider columnDivider />
          <TwoColumnsContainer>
            <TextInput
              value={qtd}
              label={strings.productItems.qtd}
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
        <Divider columnDivider />
        <BarcodeContainer
          handleBarcodeChange={setBarcode}
          barcode={barcode}
          handleCameraVisibility={handleBarcodeCameraVisibility}
        />
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
        <DueDateModal
          dueDate={dueDate}
          handleModalVisible={handleDatePickerVisible}
          isVisible={datePickerVisible}
          setDueDate={setDueDate}
        />
        <BarcodeCamera
          isVisible={barcodeCameraVisible}
          handleClose={handleBarcodeCameraVisibility}
          handleBarcodeDetected={setBarcode}
        />
      </Portal>
    </>
  );
};

export default NewItem;
