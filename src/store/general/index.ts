import { getGeneralState, getPersistState } from './selectors';
import generalActions from './actions';

const generalSelector = { getGeneralState, getPersistState };

export { generalActions, generalSelector };
