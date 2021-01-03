import { ProductItem, ProductItems } from '@store/product-list/types';

import { StockActions, StockTypes } from './types';

const actions = {
  setLoading: (isLoading: boolean): StockActions<{ isLoading: boolean }> => ({
    type: StockTypes.SET_LOADING,
    payload: { isLoading },
  }),
  setError: (error?: string): StockActions<{ error?: string }> => ({
    type: StockTypes.SET_ERROR,
    payload: { error },
  }),
  createProductItemAsync: (
    stockItem: Partial<ProductItem>,
  ): StockActions<{
    stockItem: Partial<ProductItem>;
  }> => ({
    type: StockTypes.CREATE_ITEM_ASYNC,
    payload: { stockItem },
  }),
  deleteProductItemAsync: (
    itemId: string,
  ): StockActions<{
    itemId: string;
  }> => ({
    type: StockTypes.DELETE_ITEM_ASYNC,
    payload: { itemId },
  }),
  updateProductItemAsync: (
    stockItem: Partial<ProductItem>,
  ): StockActions<{
    stockItem: Partial<ProductItem>;
  }> => ({
    type: StockTypes.UPDATE_ITEM_ASYNC,
    payload: { stockItem },
  }),
  getStockAsync: () => ({
    type: StockTypes.GET_STOCK_ASYNC,
  }),
  setStock: (stock: ProductItems): StockActions<{ stock: ProductItems }> => ({
    type: StockTypes.SET_STOCK,
    payload: { stock },
  }),
};

export default actions;
