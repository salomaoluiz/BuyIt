import * as React from 'react';
import { Portal } from 'react-native-paper';

import BarcodeCamera from '@components/barcode-camera';
import Dialog from '@components/dialog';
import Divider from '@components/divider';
import CircleButton from '@components/FAB';
import Header from '@components/header';
import TextInput from '@components/text-input';
import TouchableRipple from '@components/touchable-ripple';
import { translate } from '@locales';
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
import useItemStore from './useItemStore';
import useNewItem from './useNewItem';
import useScreenSettings from './useScreenSettings';

const NewItem = () => {
  const { formParams, setParams, handleErrorMessage, checkForm } = useForm();

  const {
    setBrand,
    setAmount,
    setName,
    setQtd,
    setUnit,
    setDueDate,
    setBarcode,
  } = setParams;

  const { amount, brand, name, qtd, unit, dueDate, barcode } = formParams;

  const {
    storedPlaceholder,
    handleAutoCompleteItemPress,
    handleBarCodeDetected,
  } = useItemStore({ formParams, setParams });

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

  const { screenTitle, fabIcon } = useScreenSettings();

  return (
    <>
      <Header title={screenTitle} backButton />
      <Container keyboardShouldPersistTaps="handled">
        <SubContainer>
          <TextInput
            value={name}
            label={translate('general.name')}
            onChangeText={setName}
            autoCompleteData={storedPlaceholder}
            onAutoCompleteItemPress={handleAutoCompleteItemPress}
            {...handleErrorMessage('name')}
          />
          <Divider columnDivider />
          <TextInput
            value={brand}
            label={translate('productItems.brand')}
            onChangeText={setBrand}
            {...handleErrorMessage('brand')}
          />
          <Divider columnDivider />
          <TwoColumnsContainer>
            <TextInput
              value={amount}
              leftIcon="currency-usd"
              onChangeText={setAmount}
              label={translate('productItems.amount')}
              prefix={translate('general.currency')}
              keyboardType="decimal-pad"
              {...handleErrorMessage('amount')}
            />
            <Divider columnDivider rowDivider />
            <TouchableRipple
              withoutBackground
              onPress={handleDatePickerVisible}>
              <TextInput
                editable={false}
                fixedValue={dueDate ? formatDate(dueDate) : undefined}
                label={translate('productItems.dueDate')}
                {...handleErrorMessage('dueDate')}
              />
            </TouchableRipple>
          </TwoColumnsContainer>
          <Divider columnDivider />
          <TwoColumnsContainer>
            <TextInput
              value={qtd}
              label={translate('productItems.qtd')}
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
                label={translate('unit.unit')}
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
        <CircleButton icon={fabIcon} onPress={onSaveButtonPress} />
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
          handleBarcodeDetected={handleBarCodeDetected}
        />
      </Portal>
    </>
  );
};

export default NewItem;
