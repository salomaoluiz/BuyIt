import { act, renderHook } from '@testing-library/react-hooks';
import { GoogleVisionBarcodesDetectedEvent } from 'react-native-camera';

import useBarcodeCamera from '../useBarcodeCamera';

describe('useBarcodeCamera', () => {
  const initialProps = {
    handleBarcodeDetected: jest.fn(),
    handleClose: jest.fn(),
    isVisible: false,
  };

  test('deve inicializar com uma referencia nula para camera', () => {
    const { result } = renderHook(useBarcodeCamera, { initialProps });

    expect(result.current.camera).toEqual({ current: null });
  });

  test('ao detectar um código de barras, deve retornar ele e fechar a camera', () => {
    const { result } = renderHook(useBarcodeCamera, { initialProps });

    const mockBarcode = {
      barcodes: [{ data: '12345' }],
    } as GoogleVisionBarcodesDetectedEvent;

    act(() => {
      result.current.onBarcodeDetect(mockBarcode);
    });

    expect(initialProps.handleBarcodeDetected).toHaveBeenCalledWith('12345');
    expect(initialProps.handleClose).toHaveBeenCalled();
  });
});
