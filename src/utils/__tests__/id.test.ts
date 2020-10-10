import * as id from '@utils/id';

const mockUniqueID = '01e6703e-24ca-4878-97e0-53c203a33c89';
jest.mock('react-native-uuid', () => ({
  v4: jest.fn(() => mockUniqueID),
}));

describe('Testando a geração de ID', () => {
  jest.spyOn(global.Math, 'random').mockReturnValue(0.5);

  test('deve gerar um id aleatório', () => {
    const result = id.generateUniqueID();

    expect(result).toEqual(mockUniqueID);
  });

  test('deve gerar um id numérico aleatório', () => {
    const result = id.randomNumberId();

    expect(result).toEqual(5000000);
  });

  test('ao chamar o injectId com um id, deve retornar o proprio objeto', () => {
    const object = {
      id: '12345',
    };

    const result = id.injectId(object);

    expect(result).toEqual(object);
  });

  test('ao chamar o injectId sem um id, deve retornar o proprio objeto com um novo id', () => {
    const object = {};

    const result = id.injectId(object);

    const expectedObject = {
      ...object,
      id: mockUniqueID,
    };

    expect(result).toEqual(expectedObject);
  });
});
