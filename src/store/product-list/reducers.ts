import {
  ProductListState,
  ProductListActions,
  ProductListTypes,
  ProductList,
} from './types';

export const initialState: ProductListState = {
  productList: [],
};

const setProductList = (
  state: ProductListState,
  action: ProductListActions<{ productList: ProductList }>,
): ProductListState => ({
  ...state,
  productList: action.payload.productList,
});

const ProductListMap = new Map([
  [ProductListTypes.SET_ITEMS_DATA, setProductList],
]);

const productListReducer = (
  state: ProductListState = initialState,
  action: ProductListActions<ProductListState>,
): ProductListState => {
  const reducer = ProductListMap.get(action.type);

  if (reducer) return reducer(state, action);

  return state;
};

export default productListReducer;
