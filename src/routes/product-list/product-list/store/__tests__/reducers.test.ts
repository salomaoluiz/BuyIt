import listItemsReducer from '../reducers';
import { initialState } from '../reducers';
import { SET_ITEMS_DATA } from '../constants';
import { ItemsActions } from '../types';

describe('ListItems Reducers', () => {
  it('deve setar o a lista de item se chamada a action SET_ITEM_DATA', () => {
    const mockData = [
      { key: '1', name: 'name', value: '1.5', qtd: '13' },
      { key: '2', name: 'name2', value: '2.5', qtd: '2' },
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
        { key: '1', name: 'name', value: '1.5', qtd: '13' },
        { key: '2', name: 'name2', value: '2.5', qtd: '2' },
      ],
    };
    const mockData = [{ key: '1', name: 'name', value: '1.5', qtd: '13' }];

    const action: ItemsActions = {
      type: SET_ITEMS_DATA,
      payload: { itemsData: mockData },
    };

    const result = listItemsReducer(mockInitialState, action);

    expect(result.itemsData).toEqual(mockData);
  });
});
