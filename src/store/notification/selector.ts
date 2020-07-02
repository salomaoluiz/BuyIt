import { RootState } from '@store/reducers';

const getState = (state: RootState) => state.notificationReducers;

export { getState };
