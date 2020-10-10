import { ApplicationState } from '@store/types';

const isLoading = (state: ApplicationState) => state.stockReducer.isLoading;

const getState = (state: ApplicationState) => state.stockReducer;
const getStock = (state: ApplicationState) => state.stockReducer.stock;
const getError = (state: ApplicationState) => state.stockReducer.error;

export { isLoading, getStock, getError, getState };
