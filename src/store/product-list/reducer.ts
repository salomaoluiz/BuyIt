import {
  ProductListState,
  ProductListActions,
  ProductListTypes,
} from './types';

const initialState: ProductListState = {
  isLoading: false,
  productLists: [],
  error: undefined,
};

const setProductList = (
  state: ProductListState,
  action: ProductListActions<ProductListState>,
): ProductListState => ({
  ...state,
  productLists: action.payload.productLists,
});

const setLoading = (
  state: ProductListState,
  action: ProductListActions<ProductListState>,
): ProductListState => ({
  ...state,
  isLoading: action.payload.isLoading,
});

const setError = (
  state: ProductListState,
  action: ProductListActions<ProductListState>,
): ProductListState => ({
  ...state,
  error: action.payload.error,
});

const ProductListMap = new Map([
  [ProductListTypes.SET_ERROR, setError],
  [ProductListTypes.SET_LOADING, setLoading],
  [ProductListTypes.SET_PRODUCT_LIST, setProductList],
]);

const reducer = (
  state: ProductListState = initialState,
  action: ProductListActions<ProductListState>,
): ProductListState => {
  const productListReducer = ProductListMap.get(action.type);

  if (productListReducer) return productListReducer(state, action);

  return state;
};

export default reducer;
