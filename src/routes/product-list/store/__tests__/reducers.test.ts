import listItemsReducer from '../reducers';
import { initialState } from '../reducers';
import { SET_ITEMS_DATA } from '../constants';
import { ItemsActions } from '../types';

describe('ListItems Reducers', () => {
  it('deve setar o a lista de item se chamada a action SET_ITEM_DATA', () => {
    const mockData = [
      { id: '1', brand: '', name: 'name', amount: '1.5', qtd: '13' },
      { id: '2', brand: '', name: 'name2', amount: '2.5', qtd: '2' },
    ];
    const action: ItemsActions = {
      type: SET_ITEMS_DATA,
      payload: { itemsData: mockData },
    };

    const result = listItemsReducer(initialState, action);

    expect(result.itemsData).toEqual(mockData);
  });

  it('deve remover um item do state se chamar SET_ITEM_DATA com menos itens', () => {
    const mockInitialState = {
      ...initialState,
      itemsData: [
        { id: '1', brand: '', name: 'name', amount: '1.5', qtd: '13' },
        { id: '2', brand: '', name: 'name2', amount: '2.5', qtd: '2' },
      ],
    };
    const mockData = [
      { id: '1', brand: '', name: 'name', amount: '1.5', qtd: '13' },
    ];

    const action: ItemsActions = {
      type: SET_ITEMS_DATA,
      payload: { itemsData: mockData },
    };

    const result = listItemsReducer(mockInitialState, action);

    expect(result.itemsData).toEqual(mockData);
  });
});
