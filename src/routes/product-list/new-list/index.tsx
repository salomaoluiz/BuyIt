import React from 'react';

import { Container, SubContainer, ButtonContainer } from './styles';
import TextInput from '@components/text-input';
import useNewList from './useNewList';
import useForm from './useForm';
import CircleButton from '@components/circle-button';
import appLocale from '@locales';

const strings = appLocale();

const NewList = () => {
  const { listParams, setName, checkForm, handleErrorMessage } = useForm();
  const { name } = listParams;
  const { onAddPress } = useNewList({ listParams, checkForm });

  return (
    <Container>
      <SubContainer>
        <TextInput
          title={strings.general.name}
          value={name}
          onChangeText={setName}
          {...handleErrorMessage('name')}
        />
      </SubContainer>
      <ButtonContainer behavior="position" keyboardVerticalOffset={30}>
        <CircleButton icon="check" onPress={onAddPress} />
      </ButtonContainer>
    </Container>
  );
};

export default NewList;
