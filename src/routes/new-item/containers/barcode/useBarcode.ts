import { Props } from './';

const useBarcode = (props: Props) => {
  const { barcode, handleBarcodeChange, handleCameraVisibility } = props;

  const showCamera = () => {
    handleCameraVisibility(true);
  };

  return {
    barcode,
    handleBarcodeChange,
    showCamera,
  };
};

export default useBarcode;
