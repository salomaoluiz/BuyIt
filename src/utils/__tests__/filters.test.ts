import * as filters from '@utils/filters';

describe('Filters', () => {
  it('deve filtrar um array pelo ID', () => {
    const mockArray = [
      { id: '12', name: 'teste' },
      { id: '34', name: 'teste2' },
    ];

    const result = filters.filterByID(mockArray, '12');

    expect(result).toEqual({ id: '12', name: 'teste' });
  });

  it('deve filtrar um array pelo que nao posssuir o ID', () => {
    const mockArray = [
      { id: '12', name: 'teste' },
      { id: '34', name: 'teste2' },
    ];

    const result = filters.filterNotByID(mockArray, '12');

    expect(result).toEqual([{ id: '34', name: 'teste2' }]);
  });

  it('deve sincronizar dois array pelo ID', () => {
    const array = [
      { id: '12', name: 'teste da batata' },
      { id: '65', name: 'teste3' },
      { id: '34', name: 'teste2', body: "Esse tem body" },
      { id: '78', name: 'teste4' },
    ];

    const arrayToCompare = [
      { id: '12', name: 'teste' },
      { id: '34', name: 'teste2' },
    ];

    const result = filters.syncTwoArraysByID(array, arrayToCompare);

    const response = [
      { id: '12', name: 'teste da batata' },
      { id: '34', name: 'teste2', body: "Esse tem body" },
    ];
    expect(result).toEqual(response);
  });
});
