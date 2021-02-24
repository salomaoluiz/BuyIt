import { act, renderHook } from '@testing-library/react-hooks';
import * as reactRedux from 'react-redux';

import { productListSelectors } from '@store/product-list';
import { ProductItemBuilderMock } from '@store/product-list/__mocks__/productItemBuilder.mock';
import { ProductItem } from '@store/product-list/types';
import { stockSelectors } from '@store/stock';

import useItemStore from '../useItemStore';

jest.mock('react-redux');

describe('useItemStore', () => {
  const item1 = new ProductItemBuilderMock().withName('item1').build();
  const item2 = new ProductItemBuilderMock().withName('item2').build();
  const item3 = new ProductItemBuilderMock()
    .withName('item3')
    .withBrand('brand3')
    .withAmount('1.4')
    .withQtd('3')
    .withId('12345')
    .withBarcode('111111')
    .build();

  const setParams = {
    setBrand: jest.fn(),
    setAmount: jest.fn(),
    setName: jest.fn(),
    setQtd: jest.fn(),
    setUnit: jest.fn(),
    setDueDate: jest.fn(),
    setBarcode: jest.fn(),
  };

  const formParams: Partial<ProductItem> = {
    brand: '',
    amount: '',
    name: '',
    qtd: '',
    unit: { id: 'un', title: 'title' },
    dueDate: undefined,
    barcode: '',
  };

  const initialProps = { setParams, formParams };
  jest.spyOn(reactRedux, 'useSelector').mockImplementation((selector) => {
    if (selector === productListSelectors.getAllItems) return [item1, item2];
    if (selector === stockSelectors.getStock) return [item3];
  });

  // on change the item name, should search in redux lists and deliver a array with the auto complete elements
  test('ao alterar o nome, deve pesquisar nas listas e entregar um array com os elementos do auto complete', () => {
    const { result, rerender } = renderHook(useItemStore, { initialProps });

    expect(result.current.storedPlaceholder).toEqual([]);

    rerender({ ...initialProps, formParams: { ...formParams, name: '3' } });

    expect(result.current.storedPlaceholder).toEqual([
      { id: '12345', label: 'item3 - brand3 - R$1.40 - 3xUnidade' },
    ]);
  });

  // on click in a auto complete item, if don't find a element should do nothing
  test('ao clicar em um item do auto complete deve obter ele da lista e setar os valores nos campos', () => {
    const { result } = renderHook(useItemStore, { initialProps });

    act(() => {
      result.current.handleAutoCompleteItemPress({
        id: '11111',
        label: 'label',
      });
    });

    const keys = Object.keys(setParams);

    for (const key of keys) {
      // @ts-ignore
      expect(setParams[key]).not.toHaveBeenCalled();
    }
  });

  // on click in a auto complete item, should get it in items list and set the values in the fields
  test('ao clicar em um item do auto complete deve obter ele da lista e setar os valores nos campos', () => {
    const { result } = renderHook(useItemStore, { initialProps });

    act(() => {
      result.current.handleAutoCompleteItemPress({
        id: '12345',
        label: 'label',
      });
    });

    expect(setParams.setName).toHaveBeenCalledWith(item3.name);
    expect(setParams.setAmount).toHaveBeenCalledWith(item3.amount);
    expect(setParams.setBrand).toHaveBeenCalledWith(item3.brand);
    expect(setParams.setQtd).toHaveBeenCalledWith(item3.qtd);
    expect(setParams.setBarcode).toHaveBeenCalledWith(item3.barcode);
  });

  // on scan a barcode with success, and find those barcode on items list, should set the values on fields
  test('ao escanear um codigo de barras com sucesso e encontrar esse codigo de barras na lista de items, deve setar os valores nos fields', () => {
    const { result } = renderHook(useItemStore, { initialProps });

    act(() => {
      result.current.handleBarCodeDetected('111111');
    });

    expect(setParams.setName).toHaveBeenCalledWith(item3.name);
    expect(setParams.setAmount).toHaveBeenCalledWith(item3.amount);
    expect(setParams.setBrand).toHaveBeenCalledWith(item3.brand);
    expect(setParams.setQtd).toHaveBeenCalledWith(item3.qtd);
    expect(setParams.setBarcode).toHaveBeenCalledWith(item3.barcode);
  });

  // on scan a barcode with success, but don't find those barcode on items list, should set only the barcode field
  test('ao escanear um codigo de barras com sucesso e mas nao encontrar esse codigo de barras na lista de items, deve setar apenas o campo do codigo de barras', () => {
    const { result } = renderHook(useItemStore, { initialProps });

    act(() => {
      result.current.handleBarCodeDetected('12345');
    });

    expect(setParams.setBarcode).toHaveBeenCalledWith('12345');
  });
});
