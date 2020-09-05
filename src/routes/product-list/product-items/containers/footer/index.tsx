import React from 'react';
import {
  Container,
  ButtonContainer,
  TextContainer,
  TextSubContainer,
  SubContainer,
  Title,
  Value,
} from './styles';
import CircleButton from '@components/circle-button';
import { ProductItems } from '@store/product-list/types';
import useFooter from './useFooter';

export interface Props {
  productItems: ProductItems;
  listId: string;
}

const Footer = (props: Props) => {
  const { amountTotal, onAddButtonPress, qtdTotal } = useFooter(props);
  return (
    <>
      <ButtonContainer>
        <CircleButton icon="plus" onPress={onAddButtonPress} />
      </ButtonContainer>
      <Container>
        <SubContainer>
          <TextContainer>
            <TextSubContainer>
              <Title>Items</Title>
              <Value>{qtdTotal}</Value>
            </TextSubContainer>
            <TextSubContainer>
              <Title>Total</Title>
              <Value>R$ {amountTotal}</Value>
            </TextSubContainer>
          </TextContainer>
        </SubContainer>
      </Container>
    </>
  );
};

export default Footer;
