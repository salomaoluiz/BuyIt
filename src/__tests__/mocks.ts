import { RootState } from '@store/reducers';

export const mockReducerInitialState: RootState = {
  generalReducers: {
    isLoading: false,
  },
  notificationReducers: {
    isVisible: false,
    body: undefined,
    title: undefined,
    icon: undefined,
  },
  productListReducers: {
    productList: [],
  },
  _persist: {
    version: 1,
    rehydrated: false,
  },
};
