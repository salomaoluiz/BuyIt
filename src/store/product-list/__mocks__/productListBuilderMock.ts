import { ProductItems, ProductItem } from '../types';

export class ProductListBuilderMock {
  id = '';
  name = '';
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
  build = () => {
    return {
      id: this.id,
      name: this.name,
      items: this.items,
    };
  };
}
