import { stockActions } from './';
import { StockState, StockAction, StockTypes, StockReducer } from './types';

const initialState: StockState = {
  isLoading: false,
  stock: [],
  error: undefined,
};

const setStock: StockReducer = (state, action) => {
  const { payload } = action as ReturnType<typeof stockActions.setStock>;

  return {
    ...state,
    stock: payload.stock,
    isLoading: false,
  };
};

const setError: StockReducer = (state, action) => {
  const { payload } = action as ReturnType<typeof stockActions.setError>;

  return {
    ...state,
    error: payload.error,
    isLoading: false,
  };
};

const requestStock: StockReducer = (state) => ({
  ...state,
  isLoading: true,
  error: undefined,
});

const StockMap = new Map([
  [StockTypes.REQUEST_STOCK, requestStock],
  [StockTypes.SET_ERROR, setError],
  [StockTypes.SET_STOCK, setStock],
]);

const reducer = (
  state: StockState = initialState,
  action: StockAction<StockState>,
): StockState => {
  const stockReducer = StockMap.get(action.type);

  if (stockReducer) return stockReducer(state, action);

  return state;
};

export default reducer;
