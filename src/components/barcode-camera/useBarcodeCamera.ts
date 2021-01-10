import { useRef } from 'react';
import {
  RNCamera,
  GoogleVisionBarcodesDetectedEvent,
} from 'react-native-camera';

import { Props } from './';

const useBarcodeCamera = (props: Props) => {
  const { handleBarcodeDetected, handleClose } = props;
  const camera = useRef<RNCamera>(null);

  const onBarcodeDetect = (barcode: GoogleVisionBarcodesDetectedEvent) => {
    handleBarcodeDetected(barcode.barcodes[0].data);
    handleClose();
  };
  return {
    camera,
    onBarcodeDetect,
  };
};

export default useBarcodeCamera;
