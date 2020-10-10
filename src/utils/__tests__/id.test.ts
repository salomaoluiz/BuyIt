import { generateUniqueID, injectId } from '@utils/id';

const mockUniqueID = '01e6703e-24ca-4878-97e0-53c203a33c89';
jest.mock('react-native-uuid', () => ({
  v4: jest.fn(() => mockUniqueID),
}));

describe('Testando a geração de ID', () => {
  test('deve gerar um id aleatório', () => {
    const result = generateUniqueID();

    expect(result).toEqual(mockUniqueID);
  });

  test('ao chamar o injectId com um id, deve retornar o proprio objeto', () => {
    const object = {
      id: '12345',
    };

    const result = injectId(object);

    expect(result).toEqual(object);
  });

  test('ao chamar o injectId sem um id, deve retornar o proprio objeto com um novo id', () => {
    const object = {};

    const result = injectId(object);

    const expectedObject = {
      ...object,
      id: mockUniqueID,
    };

    expect(result).toEqual(expectedObject);
  });
});
