import React from 'react';

import CircleButton from '@components/FAB';
import Header from '@components/header';
import TextInput from '@components/text-input';
import appLocale from '@locales';

import { Container, SubContainer, ButtonContainer } from './styles';
import useForm from './useForm';
import useNewList from './useNewList';

const strings = appLocale();

const NewList = () => {
  const { listParams, setName, checkForm, handleErrorMessage } = useForm();
  const { name } = listParams;
  const { onAddPress } = useNewList({ listParams, checkForm });

  return (
    <>
      <Header title={strings.productLists.newList} backButton />
      <Container>
        <SubContainer keyboardShouldPersistTaps="handled">
          <TextInput
            label={strings.general.name}
            value={name}
            onChangeText={setName}
            {...handleErrorMessage('name')}
          />
        </SubContainer>
        <ButtonContainer behavior="height">
          <CircleButton icon="check" onPress={onAddPress} />
        </ButtonContainer>
      </Container>
    </>
  );
};

export default NewList;
