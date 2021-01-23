import React from 'react';

import FAB from '@components/FAB';
import Subheading from '@components/subheading';
import Text from '@components/text';
import { toCurrency, translate } from '@locales';
import { ProductItems } from '@store/product-list/types';

import {
  Container,
  ButtonContainer,
  TextContainer,
  TextSubContainer,
  SubContainer,
} from './styles';
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
        <FAB icon="plus" onPress={onAddButtonPress} />
      </ButtonContainer>
      <Container>
        <SubContainer>
          <TextContainer>
            <TextSubContainer>
              <Subheading text={translate('productItems.items')} />
              <Text text={qtdTotal} />
            </TextSubContainer>
            <TextSubContainer>
              <Subheading text={translate('productItems.total')} />
              <Text text={`${toCurrency(amountTotal)}`} />
            </TextSubContainer>
          </TextContainer>
        </SubContainer>
      </Container>
    </>
  );
};

export default Footer;
