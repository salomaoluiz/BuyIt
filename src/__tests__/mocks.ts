import { RootState } from '@store/reducers';

export const mockReducerInitialState: RootState = {
  generalReducers: {
    isLoading: false,
  },
  productListReducers: {
    productList: [],
  },
  _persist: {
    version: 1,
    rehydrated: false,
  },
};
