import { DrawerNavigationProp } from '@react-navigation/drawer';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'react-native-paper';

type NavProps = NavigationProp<{}> & DrawerNavigationProp<{}>;

interface Props {
  hiddenStatusBar?: boolean;
}

const useHeader = (props: Props) => {
  const [statusBarHeight] = useState(StatusBar.currentHeight);

  const navigation = useNavigation<NavProps>();
  const theme = useTheme();

  const onBackButtonPress = useCallback(() => {
    navigation.goBack();
  }, []);

  const onShowDrawerPress = useCallback(() => {
    navigation.openDrawer();
  }, []);

  useEffect(() => {
    StatusBar.setHidden(!!props.hiddenStatusBar);
  }, [props.hiddenStatusBar]);

  return {
    onBackButtonPress,
    theme,
    onShowDrawerPress,
    statusBarHeight,
  };
};

export default useHeader;
