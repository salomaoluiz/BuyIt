import { RootState } from '@store/reducers';

export const initialAppState: RootState = {
  generalReducer: {
    isLoading: false,
  },
  productListReducer: {
    isLoading: false,
    productLists: [],
  },
  notificationReducer: {
    isVisible: false,
  },
  authReducer: {
    isLogged: false,
    isAnonymously: false,
    isOnline: false,
    isLoading: false,
    email: '',
  },
  _persist: {
    version: -1,
    rehydrated: false,
  },
  stockReducer: {
    isLoading: false,
    stock: [],
  },
};
