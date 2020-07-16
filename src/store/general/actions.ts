import { GeneralTypes, GeneralActions } from './types';

const actions = {
  setLoading: (isLoading: boolean): GeneralActions<{ isLoading: boolean }> => ({
    type: GeneralTypes.setLoading,
    payload: { isLoading },
  }),
};

export default actions;
