import { GeneralState, GeneralActions, GeneralTypes } from './types';

export const initialState = {
  isLoading: false,
};

const setLoading = (
  state: GeneralState,
  action: GeneralActions<{ isLoading: boolean }>,
): GeneralState => ({
  ...state,
  isLoading: action.payload.isLoading,
});

const GeneralReducerMap = new Map([[GeneralTypes.setLoading, setLoading]]);

const generalReducer = (
  state: GeneralState = initialState,
  action: GeneralActions<GeneralState>,
): GeneralState => {
  const reducer = GeneralReducerMap.get(action.type);

  if (reducer) return reducer(state, action);

  return state;
};

export default generalReducer;
