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

const reducer = (
  state: GeneralState = initialState,
  action: GeneralActions<GeneralState>,
): GeneralState => {
  const generalReducer = GeneralReducerMap.get(action.type);

  if (generalReducer) return generalReducer(state, action);

  return state;
};

export default reducer;
