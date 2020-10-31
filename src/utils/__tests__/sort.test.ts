import * as sort from '../sort';
describe('Sort', () => {
  test('deve ordenar por data de criação', () => {
    const mockArray = [
      { name: 'Item 1', createdAt: 1111, updatedAt: 1111 },
      { name: 'Item 2', createdAt: 3333, updatedAt: 3333 },
      { name: 'Item 3', createdAt: 7777, updatedAt: 7777 },
      { name: 'Item 4', createdAt: 2222, updatedAt: 2222 },
      { name: 'Item 5', createdAt: 4444, updatedAt: 4444 },
      { name: 'Item 6', createdAt: 5555, updatedAt: 5555 },
    ];

    const response = sort.sortByDate(mockArray, 'createdAt');

    const expected = [
      { name: 'Item 3', createdAt: 7777, updatedAt: 7777 },
      { name: 'Item 6', createdAt: 5555, updatedAt: 5555 },
      { name: 'Item 5', createdAt: 4444, updatedAt: 4444 },
      { name: 'Item 2', createdAt: 3333, updatedAt: 3333 },
      { name: 'Item 4', createdAt: 2222, updatedAt: 2222 },
      { name: 'Item 1', createdAt: 1111, updatedAt: 1111 },
    ];

    expect(response).toEqual(expected);
  });
});
