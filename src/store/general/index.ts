import generalActions from './actions';
import { getGeneralState, getPersistState } from './selectors';

const generalSelector = { getGeneralState, getPersistState };

export { generalActions, generalSelector };
