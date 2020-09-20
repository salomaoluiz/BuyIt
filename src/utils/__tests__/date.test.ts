import { getDateNow } from '@utils/date';

describe('Date Utils', () => {
  test('ao chamar getDateNow deve retornar a data de agora', () => {
    jest.spyOn(Date, 'now').mockReturnValue(123456789);

    const dateNow = getDateNow();

    expect(dateNow).toEqual(123456789);
  });
});
