import { ProductItems, ProductItem, ProductList } from '../types';

export class ProductListBuilderMock {
  id = '';
  name = '';
  createdAt = 0;
  updatedAt = 0;
  buyDate?: number = undefined;
  items: ProductItems = [];

  withId(id: string) {
    this.id = id;
    return this;
  }

  withName(name: string) {
    this.name = name;
    return this;
  }

  withItems(productItems: ProductItems) {
    this.items = productItems;
    return this;
  }

  withMoreItem(productItem: ProductItem) {
    const newItems = this.items.concat([productItem]);

    this.items = newItems;
    return this;
  }

  withCreatedAt(date: number) {
    this.createdAt = date;
    return this;
  }

  withUpdatedAt(date: number) {
    this.updatedAt = date;
    return this;
  }

  withBuyDate(date: number) {
    this.buyDate = date;
    return this;
  }
  build = (): ProductList => {
    return {
      id: this.id,
      name: this.name,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      items: this.items,
      buyDate: this.buyDate,
    };
  };
}
