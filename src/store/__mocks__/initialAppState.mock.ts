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
    banner: {},
    scheduledNotifications: [],
  },
  authReducer: {
    isLogged: false,
    isAnonymously: false,
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
