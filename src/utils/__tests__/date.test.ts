import { getDateNow, injectTimeStamp } from '@utils/date';

describe('Date Utils', () => {
  beforeAll(() => {
    jest.spyOn(Date, 'now').mockReturnValue(123456789);
  });

  test('ao chamar getDateNow deve retornar a data de agora', () => {
    const dateNow = getDateNow();

    expect(dateNow).toEqual(123456789);
  });

  test('ao chamar o injectTimeStamp com um timeStamp deve atualizar o updatedAt apenas', () => {
    const object = {
      updatedAt: 11111111,
      createdAt: 12345,
    };

    const result = injectTimeStamp(object);

    const expectedObject = {
      updatedAt: 123456789,
      createdAt: 12345,
    };

    expect(result).toEqual(expectedObject);
  });

  test('ao chamar o injectTimeStamp sem nenhum timeStamp deve criar o updatedAt e createdAt', () => {
    const object = {};

    const result = injectTimeStamp(object);

    const expectedObject = {
      updatedAt: 123456789,
      createdAt: 123456789,
    };

    expect(result).toEqual(expectedObject);
  });
});
