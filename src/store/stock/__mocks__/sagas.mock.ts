//@ts-nocheck
import { ProductItemBuilderMock } from './stockItemBuilder.mock';

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