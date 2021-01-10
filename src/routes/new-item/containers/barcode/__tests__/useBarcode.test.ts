import { act, renderHook } from '@testing-library/react-hooks';

import useBarcode from '../useBarcode';

describe('useBarcode', () => {
  const initialProps = {
    barcode: '11111',
    handleCameraVisibility: jest.fn(),
    handleBarcodeChange: jest.fn(),
  };

  test('deve inicializar passando o barcode recebido pela props', () => {
    const { result } = renderHook(useBarcode, { initialProps });

    expect(result.current.barcode).toEqual('11111');
  });

  test('deve abrir a camera', () => {
    const { result } = renderHook(useBarcode, { initialProps });

    act(() => {
      result.current.showCamera();
    });

    expect(initialProps.handleCameraVisibility).toHaveBeenCalledWith(true);
  });
});
