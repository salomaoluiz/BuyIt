import { Dimensions } from 'react-native';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const spacing = {
  smalless: '4px',
  small: '8px',
  medium: '10px',
  big: '14px',
  biggest: '16px',
};

const radius = {
  small: '4px',
  regular: '10px',
  big: '16px',
  round: '500px'
}
const dimensions = {
  screenHeight,
  screenWidth,
  spacing,
  radius,
};

export default dimensions;
