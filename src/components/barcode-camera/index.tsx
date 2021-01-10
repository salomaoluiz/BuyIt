import * as React from 'react';

import Icon from '@components/icon';
import { dimensions, getStyleAsNumber } from '@styles';

import { CloseContainer, Camera } from './styles';
import useBarcodeCamera from './useBarcodeCamera';

export interface Props {
  isVisible: boolean;
  handleClose: () => void;
  handleBarcodeDetected: (barcode: string) => void;
}

const BarcodeCamera = (props: Props) => {
  const { isVisible, handleClose } = props;
  const { camera, onBarcodeDetect } = useBarcodeCamera(props);

  if (!isVisible) return null;

  return (
    <>
      <Camera ref={camera} onGoogleVisionBarcodesDetected={onBarcodeDetect} />
      <CloseContainer>
        <Icon
          isVisible
          name="close"
          onPress={handleClose}
          size={getStyleAsNumber(dimensions.size.Md)}
        />
      </CloseContainer>
    </>
  );
};

export default BarcodeCamera;
