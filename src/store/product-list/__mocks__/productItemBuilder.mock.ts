import { ProductItem } from '../types';

export class ProductItemBuilderMock {
  id = '';
  name = '';
  amount = '';
  qtd = '';
  brand = '';
  unit = 'un';

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

  withUnit(unit: string) {
    this.unit = unit;
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
    };
  };
}
