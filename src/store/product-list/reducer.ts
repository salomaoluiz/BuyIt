import { productListActions } from '.';
import {
  ProductListState,
  ProductListAction,
  ProductListTypes,
  ProductListReducer,
} from './types';

const initialState: ProductListState = {
  isLoading: false,
  productLists: [],
  error: undefined,
};

const requestData: ProductListReducer = (state) => ({
  ...state,
  isLoading: true,
  error: undefined,
});

const setProductLists: ProductListReducer = (state, action) => {
  const { payload } = action as ReturnType<
    typeof productListActions.setProductLists
  >;

  return {
    ...state,
    productLists: payload.productLists,
    isLoading: false,
    error: undefined,
  };
};

const setError: ProductListReducer = (state, action) => {
  const { payload } = action as ReturnType<typeof productListActions.setError>;

  return {
    ...state,
    isLoading: false,
    error: payload.error,
  };
};

const ProductListMap = new Map([
  [ProductListTypes.SET_ERROR, setError],
  [ProductListTypes.SET_PRODUCT_LISTS, setProductLists],
  [ProductListTypes.REQUEST_ITEMS, requestData],
  [ProductListTypes.REQUEST_LISTS, requestData],
]);

const reducer = (
  state: ProductListState = initialState,
  action: ProductListAction<ProductListState>,
): ProductListState => {
  const productListReducer = ProductListMap.get(action.type);

  if (productListReducer) return productListReducer(state, action);

  return state;
};

export default reducer;
