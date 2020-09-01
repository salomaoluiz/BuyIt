import React from 'react';

import { Container, SubContainer, ButtonContainer } from './styles';
import TextInput from '@components/text-input';
import useNewList from './useNewList';
import * as strings from '@locales/product-list';
import useForm from './useForm';
import CircleButton from '@components/circle-button';

const NewList = () => {
  const { listParams, setName, checkForm, handleErrorMessage } = useForm();
  const { name } = listParams;
  const { onAddPress } = useNewList({ listParams, checkForm });

  return (
    <Container>
      <SubContainer keyboardShouldPersistTaps="always">
        <TextInput
          title={strings.name}
          value={name}
          onChangeText={setName}
          {...handleErrorMessage('name')}
        />
      </SubContainer>
      <ButtonContainer behavior="position" keyboardVerticalOffset={70}>
        <CircleButton icon="check" onPress={onAddPress} />
      </ButtonContainer>
    </Container>
  );
};

export default NewList;
