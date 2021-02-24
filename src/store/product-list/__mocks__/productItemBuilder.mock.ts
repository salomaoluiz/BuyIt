import { PaperListData } from '@components/list';

import { ProductItem } from '../types';

export class ProductItemBuilderMock {
  id = '';
  name = '';
  amount = '';
  qtd = '';
  brand = '';
  dueDate?: number = undefined;
  createdAt = 0;
  updatedAt = 0;
  unit: PaperListData = { id: 'un', title: 'Unidade' };
  barcode?: string;

  withId(id: string) {
    this.id = id;
    return this;
  }

  withName(name: string) {
    this.name = name;
    return this;
  }

  withAmount(amount: string) {
    this.amount = amount;
    return this;
  }

  withQtd(qtd: string) {
    this.qtd = qtd;
    return this;
  }

  withBrand(brand: string) {
    this.brand = brand;
    return this;
  }

  withUnit(unit: PaperListData) {
    this.unit = unit;
    return this;
  }
  withCreatedAt(createdAt: number) {
    this.createdAt = createdAt;
    return this;
  }
  withUpdatedAt(updatedAt: number) {
    this.updatedAt = updatedAt;
    return this;
  }

  withDueDate(dueDate: number) {
    this.dueDate = dueDate;
    return this;
  }

  withBarcode(barcode: string) {
    this.barcode = barcode;
    return this;
  }

  build = (): ProductItem => {
    return {
      id: this.id,
      name: this.name,
      amount: this.amount,
      qtd: this.qtd,
      brand: this.brand,
      unit: this.unit,
      dueDate: this.dueDate,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      barcode: this.barcode,
    };
  };
}
