import { act, renderHook } from '@testing-library/react-hooks';

import useUnitModal from '../useUnitModal';

describe('testando useUnitModal', () => {
  test('ao pressionar em um item, deve setar ele e fechar o modal', () => {
    const initialProps = {
      unit: { id: '222', title: 'title2' },
      setUnit: jest.fn(),
      handleModalVisible: jest.fn(),
    };

    const { result } = renderHook(useUnitModal, { initialProps });

    const newUnitSelected = [{ id: '111', title: 'title1' }];
    act(() => {
      result.current.handleUnitSelect(newUnitSelected);
    });

    expect(initialProps.setUnit).toHaveBeenCalledWith(newUnitSelected[0]);
    expect(initialProps.handleModalVisible).toHaveBeenCalledWith(false);
  });
});
