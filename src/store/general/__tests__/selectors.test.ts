import { AppStateMockBuilder } from '@store/__mocks__/AppStateMockBuilder.mock';

import { generalSelector } from '../';

describe('General Selectors', () => {
  it('deve retornar o general state corretamente', () => {
    const mockData = new AppStateMockBuilder()
      .withGeneral({ isLoading: false })
      .build();
    const received = generalSelector.getGeneralState(mockData);

    expect(received).toEqual(mockData.generalReducer);
  });

  it('deve retornar o persistState corretamente', () => {
    const mockData = new AppStateMockBuilder()
      .withPersist({ rehydrated: true, version: -1 })
      .build();
    const received = generalSelector.getPersistState(mockData);

    expect(received).toEqual(mockData._persist);
  });
});
