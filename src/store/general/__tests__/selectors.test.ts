import { generalSelector } from '..';
import { mockReducerInitialState } from 'src/__tests__/mocks';

describe('General Selectors', () => {
  it('deve retornar o general state corretamente', () => {
    const received = generalSelector.getGeneralState(mockReducerInitialState);

    expect(received).toEqual(mockReducerInitialState.generalReducers);
  });

  it('deve retornar o persistState corretamente', () => {
    const received = generalSelector.getPersistState(mockReducerInitialState);

    expect(received).toEqual(mockReducerInitialState._persist);
  });
});
