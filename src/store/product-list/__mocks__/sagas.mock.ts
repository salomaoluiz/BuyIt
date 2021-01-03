//@ts-nocheck
import { ProductItemBuilderMock } from './productItemBuilder.mock';
import { ProductListBuilderMock } from './productListBuilder.mock';

export const firstProductItem = () =>
  new ProductItemBuilderMock()
    .withId('123456')
    .withName('Product 1')
    .withAmount('1')
    .withBrand('Marca 1')
    .withQtd('1')
    .withUnit('un');

export const secondProductItem = () =>
  new ProductItemBuilderMock()
    .withId('654321')
    .withName('Product 2')
    .withAmount('2')
    .withBrand('Marca 2')
    .withQtd('2')
    .withUnit('un');

export const productListWithItems = () =>
  new ProductListBuilderMock()
    .withId('123456')
    .withItems([firstProductItem().build(), secondProductItem().build()])
    .withName('With Items');

export const productListEmpty = () =>
  new ProductListBuilderMock().withId('654321').withName('Without Name');
