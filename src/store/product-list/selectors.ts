import { RootState } from '@store/reducers';

const getState = (state: RootState) => state.productListReducer;

const getProductLists = (state: RootState) =>
  state.productListReducer.productLists;

const getProductItems = (state: RootState, listId: string) =>
  state.productListReducer.productLists.find((list) => list.id === listId)
    ?.items;

const isLoading = (state: RootState) => state.productListReducer.isLoading;

const selectors = {
  getProductItems,
  getState,
  getProductLists,
  isLoading,
};
export default selectors;
