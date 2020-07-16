import { RootState } from '@store/reducers';

const getState = (state: RootState) => state.productListReducers;

const selectors = {
  getState,
};
export default selectors;
