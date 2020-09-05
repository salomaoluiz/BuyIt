import { RootState } from '@store/reducers';

const getState = (state: RootState) => state.notificationReducer;

export { getState };
