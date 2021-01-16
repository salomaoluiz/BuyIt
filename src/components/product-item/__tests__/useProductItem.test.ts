import { renderHook } from '@testing-library/react-hooks';

import { ProductItemBuilderMock } from '@store/product-list/__mocks__/productItemBuilder.mock';

import useProductItem from '../useProductItem';

describe('useProductItem', () => {
  // when start, should set the subtotal
  test('ao inicializar, deve setar o subtotal', () => {
    const mockProductItem = new ProductItemBuilderMock()
      .withQtd('3')
      .withAmount('2.5')
      .build();

    const initialProps = {
      index: 0,
      productItem: mockProductItem,
      onDeleteItem: jest.fn(),
      onEditItem: jest.fn(),
    };

    const { result } = renderHook(useProductItem, { initialProps });

    expect(result.current.subTotal).toEqual(7.5);
  });
});
