import listItemsReducer from '../reducers';
import { initialState } from '../reducers';
import { productListActions } from '..';

describe('ListItems Reducers', () => {
  it('deve setar o a lista de item se chamada a action SET_ITEM_DATA', () => {
    const mockData = [
      { id: '1', brand: '', name: 'name', amount: '1.5', unit: 'g', qtd: '13' },
      { id: '2', brand: '', name: 'name2', amount: '2.5', unit: 'g', qtd: '2' },
    ];
    const action = productListActions.setProductList(mockData);

    const result = listItemsReducer(initialState, action);

    expect(result.productList).toEqual(mockData);
  });

  it('deve remover um item do state se chamar SET_ITEM_DATA com menos itens', () => {
    const mockInitialState = {
      ...initialState,
      itemsData: [
        {
          id: '1',
          brand: '',
          name: 'name',
          amount: '1.5',
          unit: 'g',
          qtd: '13',
        },
        {
          id: '2',
          brand: '',
          name: 'name2',
          amount: '2.5',
          unit: 'g',
          qtd: '2',
        },
      ],
    };
    const mockData = [
      { id: '1', brand: '', name: 'name', amount: '1.5', unit: 'g', qtd: '13' },
    ];

    const action = productListActions.setProductList(mockData);

    const result = listItemsReducer(mockInitialState, action);

    expect(result.productList).toEqual(mockData);
  });

  test('deve retornar o valor default', () => {
    const action = { type: 'any', payload: {} };

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const result = listItemsReducer(initialState, action);

    expect(result).toEqual(initialState);
  });
});
