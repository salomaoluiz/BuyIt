import { RootState } from '@store/reducers';

const isLoading = (state: RootState) => state.stockReducer.isLoading;

const getState = (state: RootState) => state.stockReducer;
const getStock = (state: RootState) => state.stockReducer.stock;
const getError = (state: RootState) => state.stockReducer.error;

export { isLoading, getStock, getError, getState };
