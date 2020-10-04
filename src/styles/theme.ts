import { DefaultTheme } from 'react-native-paper';
import { Theme } from 'react-native-paper/src/types';

const theme: Theme = {
  ...DefaultTheme,
  fonts: {
    regular: {
      fontFamily: 'Roboto-Regular',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Roboto-Light',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Roboto-Medium',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Roboto-Thin',
      fontWeight: 'normal',
    },
  },
  animation: {
    scale: 1,
  },
  colors: {
    ...DefaultTheme.colors,
    primary: '#ba68c8',
    accent: '#42a5f5',
  },
};

export default theme;
