import * as date from '@utils/date';

describe('Date Utils', () => {
  beforeAll(() => {
    jest.spyOn(Date, 'now').mockReturnValue(1604012169142);
  });

  test('ao chamar getDateNow deve retornar a data de agora', () => {
    const dateNow = date.getDateNow();

    expect(dateNow).toEqual(1604012169142);
  });

  test('ao chamar o injectTimeStamp com um timeStamp deve atualizar o updatedAt apenas', () => {
    const object = {
      updatedAt: 11111111,
      createdAt: 12345,
    };

    const result = date.injectTimeStamp(object);

    const expectedObject = {
      updatedAt: 1604012169142,
      createdAt: 12345,
    };

    expect(result).toEqual(expectedObject);
  });

  test('ao chamar o injectTimeStamp sem nenhum timeStamp deve criar o updatedAt e createdAt', () => {
    const object = {};

    const result = date.injectTimeStamp(object);

    const expectedObject = {
      updatedAt: 1604012169142,
      createdAt: 1604012169142,
    };

    expect(result).toEqual(expectedObject);
  });

  test('deve retornar a data formatada', () => {
    const mockDate = 1603963032026;

    const result = date.formatDate(mockDate);

    expect(result).toEqual('29/10/2020');
  });

  test('deve adicionar 2 dias e retornar a nova data', () => {
    const mockDate = Date.now();

    const result = date.addRemoveDays(2, mockDate);

    const mockDays = new Date(mockDate).getDate();

    expect(result.getDate()).toEqual(mockDays + 2);
  });

  test('deve adicionar 2 minutos e retornar a nova hora', () => {
    const mockDate = Date.now();

    const result = date.addRemoveMinutes(2, mockDate);

    const mockMinutes = new Date(mockDate).getMinutes();

    expect(result.getMinutes()).toEqual(mockMinutes + 2);
  });

  test('deve retornar informando que a data é após a data comparada', () => {
    const mockDate = Date.now();
    const today = new Date().getTime();

    const result = date.isBeforeThan(mockDate, today);

    expect(result).toEqual(true);
  });
});
