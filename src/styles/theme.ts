import { DefaultTheme } from 'react-native-paper';

import { Theme } from 'react-native-paper/src/types';

interface CustomTheme extends Theme {
  emphasis: {
    high: number;
    medium: number;
    disabled: number;
  };
}

const theme: CustomTheme = {
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
  emphasis: {
    disabled: 0.38,
    high: 0.87,
    medium: 0.6,
  },
};

export default theme;
