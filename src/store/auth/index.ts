import actions from './actions';
import * as selectors from './selectors';
import * as models from './models';

const authSelectors = { ...selectors };
const authModels = { ...models };
const authActions = { ...actions };

export { authActions, authModels, authSelectors };
