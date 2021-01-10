import { ProductItem, ProductItems } from '@store/product-list/types';

import { StockAction, StockTypes } from './types';

const actions = {
  setError: (error?: string): StockAction<{ error?: string }> => ({
    type: StockTypes.SET_ERROR,
    payload: { error },
  }),
  createItem: (
    stockItem: Partial<ProductItem>,
  ): StockAction<{
    stockItem: Partial<ProductItem>;
  }> => ({
    type: StockTypes.CREATE_ITEM,
    payload: { stockItem },
  }),
  deleteItem: (
    itemId: string,
  ): StockAction<{
    itemId: string;
  }> => ({
    type: StockTypes.DELETE_ITEM,
    payload: { itemId },
  }),
  updateItem: (
    stockItem: Partial<ProductItem>,
  ): StockAction<{
    stockItem: Partial<ProductItem>;
  }> => ({
    type: StockTypes.UPDATE_ITEM,
    payload: { stockItem },
  }),
  requestStock: () => ({
    type: StockTypes.REQUEST_STOCK,
  }),
  setStock: (stock: ProductItems): StockAction<{ stock: ProductItems }> => ({
    type: StockTypes.SET_STOCK,
    payload: { stock },
  }),
};

export default actions;
