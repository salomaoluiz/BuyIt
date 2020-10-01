import React from 'react';

import { Container, SubContainer, ButtonContainer } from './styles';
import TextInput from '@components/text-input';
import useNewList from './useNewList';
import useForm from './useForm';
import CircleButton from '@components/FAB';
import appLocale from '@locales';
import Header from '@components/header';

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
