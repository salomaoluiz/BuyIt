import React from 'react';
import {
  Container,
  ButtonContainer,
  TextContainer,
  TextSubContainer,
  SubContainer,
} from './styles';
import FAB from '@components/FAB';
import { ProductItems } from '@store/product-list/types';
import useFooter from './useFooter';
import Subheading from '@components/subheading';
import appLocale, { appCurrency } from '@locales';
import Text from '@components/text';

export interface Props {
  productItems: ProductItems;
  listId: string;
}

const strings = appLocale();
const currency = appCurrency();
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
              <Subheading text={strings.productLists.items} />
              <Text text={qtdTotal} />
            </TextSubContainer>
            <TextSubContainer>
              <Subheading text={strings.productLists.total} />
              <Text text={`${currency} ${amountTotal}`} />
            </TextSubContainer>
          </TextContainer>
        </SubContainer>
      </Container>
    </>
  );
};

export default Footer;
