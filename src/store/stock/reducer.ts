import {
  StockState,
  StockActions,
  StockTypes,
} from './types';

const initialState: StockState = {
  isLoading: false,
  stock: [],
  error: undefined,
};

const setStock = (
  state: StockState,
  action: StockActions<StockState>,
): StockState => ({
  ...state,
  stock: action.payload.stock,
});

const setLoading = (
  state: StockState,
  action: StockActions<StockState>,
): StockState => ({
  ...state,
  isLoading: action.payload.isLoading,
});

const setError = (
  state: StockState,
  action: StockActions<StockState>,
): StockState => ({
  ...state,
  error: action.payload.error,
});

const StockMap = new Map([
  [StockTypes.SET_ERROR, setError],
  [StockTypes.SET_LOADING, setLoading],
  [StockTypes.SET_STOCK, setStock],
  
]);

const reducer = (
  state: StockState = initialState,
  action: StockActions<StockState>,
): StockState => {
  const stockReducer = StockMap.get(action.type);

  if (stockReducer) return stockReducer(state, action);

  return state;
};

export default reducer;
