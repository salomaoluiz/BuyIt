import colors from './colors';
import { StackNavigationOptions } from '@react-navigation/stack';

const defaultHeader: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: colors.list.brandPrimaryDark,
  },
  headerTintColor: colors.list.neutralDarkest,
  headerRightContainerStyle: {
    margin: 16,
  },
};

const navigationStyles = {
  defaultHeader,
};

export default navigationStyles;
