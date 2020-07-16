export enum GeneralTypes {
  setLoading = '@@GENERAL/SET_LOADING',
}
export interface GeneralState {
  isLoading: boolean;
}
export type GeneralActions<Payload> = {
  type: GeneralTypes;
  payload: Payload;
};

export type GeneralReducer = (
  state: GeneralState,
  actions: GeneralActions<GeneralState>,
) => GeneralState;
