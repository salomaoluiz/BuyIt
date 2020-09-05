import { RootState } from '@store/reducers';

const getPersistState = (rootState: RootState) => rootState._persist;

const getGeneralState = (rootState: RootState) => rootState.generalReducer;

export { getGeneralState, getPersistState };
