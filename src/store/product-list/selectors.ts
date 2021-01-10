import { RootState } from '@store/reducers';

export const getState = (state: RootState) => state.productListReducer;

export const getProductLists = (state: RootState) =>
  state.productListReducer.productLists;

export const getProductItems = (state: RootState, listId: string) =>
  state.productListReducer.productLists.find((list) => list.id === listId)
    ?.items;

export const isLoading = (state: RootState) => state.productListReducer.isLoading;
