import { Dimensions } from 'react-native';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const spacing = {
  none: '0px',
  inlineLg: '48px',
  inlineMd: '32px',
  inlineMdNumber: 32,
  inlineSm: '24px',
  inlineXl: '64px',
  inlineXs: '16px',
  inlineXxs: '8px',
  inlineXxxs: '4px',
  insetLg: '32px',
  insetMd: '24px',
  insetSm: '16px',
  insetXl: '48px',
  insetXs: '8px',
  insetXxs: '4px',
  squishLg: '16px 32px',
  squishMd: '16px 24px',
  squishSm: '8px 24px',
  squishXl: '24px 32px',
  squishXs: '8px 16px',
  squishXxl: '32px 48px',
  squishXxs: '4px 16px',
  squishXxxs: '4px 8px',
};

const size = {
  stackLg: '48px',
  stackMd: '32px',
  stackSm: '24px',
  stackXl: '64px',
  stackXs: '16px',
  stackXxl: '96px',
  stackXxs: '8px',
  stackXxxl: '128px',
  stackXxxlNumber: 128,
  stackXXxl: '256px',
  stackXXxlNumber: 256,
  stackXxxs: '4px',
};

const border = {
  elevation: 5,
  widthNone: '0',
  widthThin: '1px',
  widthMedium: '2px',
  widthThick: '4px',
  radiusNone: '0',
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
