import { ProductList, ProductListActions, ProductListTypes } from './types';

const actions = {
  setProductList: (
    productList: ProductList,
  ): ProductListActions<{ productList: ProductList }> => ({
    type: ProductListTypes.SET_ITEMS_DATA,
    payload: { productList },
  }),
};

export default actions;
