import React from 'react';

import { ProductItem } from '@store/product-list/types';

import {
  ItemContainer,
  ItemButton,
  ItemSubContainer,
  IconContainer,
  TextsContainer,
  Brand,
  TitleContainer,
  AmountContainer,
  Price,
  SubTotal,
  Title,
  TopContainer,
} from './styles';
import Divider from '@components/divider';
import Icon from '@components/icon';
import useProductItem from './useProductItem';
import appLocale, { appCurrency } from '@locales';
import Menu from '@components/menu';
export interface Props {
  onPress?: () => void;
  index: number;
  productItem: ProductItem;
  onDeleteItem: () => void;
  onEditItem: () => void;
  onChangeCheckBox?: () => void;
}

const strings = appLocale();
const currency = appCurrency();

const ProductItemComponent = (props: Props) => {
  const {
    productItem,
    onDeleteItem,
    onEditItem,
    onPress,
    onChangeCheckBox,
  } = props;
  const { subTotal } = useProductItem(props);

  const menuItems = [
    {
      title: strings.general.edit,
      icon: 'pencil',
      onPress: onEditItem,
      hasDivider: true,
    },
    { title: strings.general.delete, icon: 'close', onPress: onDeleteItem },
  ];

  return (
    <>
      <ItemContainer>
        <ItemButton onPress={onPress}>
          <ItemSubContainer>
            {onChangeCheckBox && (
              <IconContainer>
                <Icon
                  isVisible
                  name="checkbox-blank-circle-outline"
                  hitslop
                  onPress={onChangeCheckBox}
                />
              </IconContainer>
            )}
            <TextsContainer>
              <TopContainer>
                <TitleContainer>
                  <Title text={productItem.name} />
                  <Divider rowDivider halfSize />
                  <Brand text={productItem.brand} />
                </TitleContainer>
                <Menu items={menuItems}>
                  <Icon isVisible name="dots-vertical" hitslop />
                </Menu>
              </TopContainer>
              <AmountContainer>
                <Price
                  text={`${strings.productItems.qtdTimes(
                    productItem.qtd,
                    currency,
                    productItem.amount,
                  )}`}
                />
                <SubTotal text={`${currency} ${subTotal}`} />
              </AmountContainer>
            </TextsContainer>
          </ItemSubContainer>
        </ItemButton>
      </ItemContainer>
      <Divider columnDivider halfSize showHorizontalDivider />
    </>
  );
};

export default ProductItemComponent;
