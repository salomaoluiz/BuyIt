import React from 'react';

import DateTimePicker from '@components/datetimepicker';
import CircleButton from '@components/FAB';
import Header from '@components/header';
import TextInput from '@components/text-input';
import TouchableRipple from '@components/touchable-ripple';
import { translate } from '@locales';
import { formatDate } from '@utils/date';

import { Container, SubContainer, ButtonContainer } from './styles';
import useForm from './useForm';
import useNewList from './useNewList';
import useScreenSettings from './useScreenSettings';

const NewList = () => {
  const {
    listParams,
    setName,
    checkForm,
    handleErrorMessage,
    setBuyDate,
  } = useForm();
  const { name, buyDate } = listParams;
  const {
    onAddPress,
    datePickerVisible,
    handleDatePickerVisible,
  } = useNewList({ listParams, checkForm });

  const { fabIcon, screenTitle } = useScreenSettings();

  return (
    <>
      <Header title={screenTitle} backButton />
      <Container>
        <SubContainer keyboardShouldPersistTaps="handled">
          <TextInput
            label={translate('general.name')}
            value={name}
            onChangeText={setName}
            {...handleErrorMessage('name')}
          />
          <TouchableRipple withoutBackground onPress={handleDatePickerVisible}>
            <TextInput
              editable={false}
              fixedValue={buyDate ? formatDate(buyDate) : undefined}
              label={translate('productLists.buyDate')}
            />
          </TouchableRipple>
        </SubContainer>
        <DateTimePicker
          getDateTime={setBuyDate}
          mode="date"
          isVisible={datePickerVisible}
          handleModalVisible={handleDatePickerVisible}
          value={buyDate}
        />
        <ButtonContainer behavior="height">
          <CircleButton icon={fabIcon} onPress={onAddPress} />
        </ButtonContainer>
      </Container>
    </>
  );
};

export default NewList;
