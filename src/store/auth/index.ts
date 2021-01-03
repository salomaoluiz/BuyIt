import actions from './actions';
import * as models from './models';
import * as selectors from './selectors';

const authSelectors = { ...selectors };
const authModels = { ...models };
const authActions = { ...actions };

export { authActions, authModels, authSelectors };
