import { filterByID } from '@utils/filters';

describe('Filters', () => {
	it('deve filtrar um array pelo ID', () => {
		const mockArray = [
			{ id: '12', name: 'teste' },
			{ id: '34', name: 'teste2' },
		];

		const result = filterByID(mockArray, '12');

		expect(result).toEqual({ id: '12', name: 'teste' });
	});
});
