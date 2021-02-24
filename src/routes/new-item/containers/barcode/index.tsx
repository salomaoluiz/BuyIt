import React from 'react';

import Icon from '@components/icon';
import TextInput from '@components/text-input';
import { dimensions, getStyleAsNumber } from '@styles';

import { Container } from './styles';
import useBarcode from './useBarcode';

export interface Props {
  handleCameraVisibility: (visibility: boolean) => void;
  barcode?: string;
  handleBarcodeChange: (barcode: string) => void;
}

const BarcodeContainer = (props: Props) => {
  
  const { barcode, handleBarcodeChange, showCamera } = useBarcode(props);

  return (
    <Container>
      <Icon
        isVisible
        name="camera"
        size={getStyleAsNumber(dimensions.size.Lg)}
        onPress={showCamera}
      />
      <TextInput
        value={barcode}
        label="Bar Code"
        onChangeText={handleBarcodeChange}
        keyboardType="decimal-pad"
      />
    </Container>
  );
};

export default BarcodeContainer;
