import { ProductItems, ProductItem } from '../types';

export class ProductListBuilderMock {
  id = '';
  name = '';
  createdAt = 0;
  updatedAt = 0;
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

  build = (props?: { inArray?: boolean }): any => {
    const data = {
      id: this.id,
      name: this.name,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      items: this.items,
    };
    if (props && props.inArray) {
      return [data];
    }
    return data;
  };
}
