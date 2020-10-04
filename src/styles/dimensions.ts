import { Dimensions } from 'react-native';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const spacing = {
  none: '0px',
  XXl: '72px',
  Xll: '36px',
  Xl: '32px',
  Lg: '24px',
  Md: '16px',
  Sm: '12px',
  Xss: '10px',
  Xs: '8px',
  Xxs: '4px',
};

const size = {
  XXXl: '360px',
  XXxl: '280px',
  XXl: '128px',
  Xxl: '72px',
  Xl: '56px',
  Lg: '48px',
  Mdd: '36px',
  Md: '32px',
  Sm: '24px',
  Xs: '18px',
  Xxs: '12px',
};

const border = {
  elevation: '2px',
  widthNone: '0px',
  widthThin: '1px',
  widthMedium: '2px',
  widthThick: '4px',
  radiusNone: '0px',
  radiusXs: '4px',
  radiusSm: '8px',
  radiusMd: '16px',
  radiusLg: '24px',
  radiusPill: '500px',
  radiusCircle: '5000px',
};

const dimensions = {
  screenHeight,
  screenWidth,
  spacing,
  border,
  size,
};

export default dimensions;
