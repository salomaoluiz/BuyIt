import { Dimensions } from 'react-native';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const dimensions = {
  screenHeight,
  screenWidth,
};

export default dimensions;