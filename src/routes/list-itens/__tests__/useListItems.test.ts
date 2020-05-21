import { renderHook } from '@testing-library/react-hooks';
import useListItems from '../useListItems';
import * as reactRedux from 'react-redux';

describe('Testando useListItems', () => {
  let getItemData: jest.SpyInstance;
  const itemDataMocked = [
    { key: '1', name: 'name', value: '1.5', qtd: '13' },
    { key: '2', name: 'name2', value: '2.5', qtd: '2' },
  ];

  beforeEach(() => {
    getItemData = jest
      .spyOn(reactRedux, 'useSelector')
      .mockReturnValue(itemDataMocked);
  });
  
  it('deve ao iniciar chamar o reducer e setar retornar a lista de itens', () => {
    const { result } = renderHook(useListItems);

    expect(getItemData).toBeCalled();
    expect(result.current.itemsData).toEqual(itemDataMocked);
  });

  it('deve ao iniciar calcular corretamente o valor total e quantidade total', () => {
    const { result } = renderHook(useListItems);

    expect(result.current.amountTotal).toEqual(4);
    expect(result.current.qtdTotal).toEqual(15);
  });
});
