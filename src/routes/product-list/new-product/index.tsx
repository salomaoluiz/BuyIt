import * as React from 'react';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamsList } from '@navigator';
import * as strings from '@locales/product-list';

import useNewProduct from './useNewProduct';
import { Container, TextInput, InputContainer, Button } from './styles';

export type Props = StackScreenProps<RootStackParamsList, 'NewProduct'>;

const NewProduct = (props: Props) => {
  const {
    amount,
    name,
    qtd,
    setAmount,
    setName,
    setQtd,
    qtdDefault,
    onSaveButtonPress,
  } = useNewProduct(props);

  return (
    <Container>
      <InputContainer>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder={strings.name}
        />
        <TextInput
          value={amount}
          onChangeText={setAmount}
          placeholder={strings.amount}
        />
        <TextInput
          value={qtd}
          onChangeText={setQtd}
          placeholder={`${strings.qtd} - ${strings.qtdDefault(qtdDefault)}`}
        />
      </InputContainer>
      <Button title={strings.add} onPress={onSaveButtonPress} />
    </Container>
  );
};

export default NewProduct;
