import { RootState } from '@store/reducers';

const getState = (state: RootState) => state.productListReducer;

const getProductLists = (state: RootState) =>
  state.productListReducer.productLists;

const isLoading = (state: RootState) => state.productListReducer.isLoading;

const selectors = {
  getState,
  getProductLists,
  isLoading,
};
export default selectors;
