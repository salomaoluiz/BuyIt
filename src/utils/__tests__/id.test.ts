import { generateUniqueID } from '@utils/id';

const mockUniqueID = '01e6703e-24ca-4878-97e0-53c203a33c89';
jest.mock('react-native-uuid', () => ({
	v4: jest.fn(() => mockUniqueID),
}));

describe('Testando a geração de ID', () => {
	it('deve gerar um id aleatório', () => {
		const result = generateUniqueID();

		expect(result).toEqual(mockUniqueID);
	});
});
