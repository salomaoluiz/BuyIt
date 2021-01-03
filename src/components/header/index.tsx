import React from 'react';
import { StatusBar } from 'react-native';
import { Appbar as PaperAppBar } from 'react-native-paper';

import useHeader from './useHeader';

export interface Props {
  title: string;
  subtitle?: string;
  backButton?: boolean;
  hiddenStatusBar?: boolean;
  hidden?: boolean;
  firstAction?: {
    icon: string;
    onPress: () => void;
  };
  secondAction?: {
    icon: string;
    onPress: () => void;
  };
  drawerButton?: boolean;
}

const Header = (props: Props) => {
  const {
    title,
    subtitle,
    backButton,
    drawerButton,
    firstAction,
    secondAction,
    hiddenStatusBar,
    hidden,
  } = props;

  const { onBackButtonPress, onShowDrawerPress, statusBarHeight } = useHeader({
    hiddenStatusBar,
  });

  if (hidden) return null;

  return (
    <PaperAppBar.Header statusBarHeight={statusBarHeight}>
      <StatusBar backgroundColor={`#000000AA`} translucent />
      {backButton && <PaperAppBar.BackAction onPress={onBackButtonPress} />}
      {drawerButton && (
        <PaperAppBar.Action icon={'menu'} onPress={onShowDrawerPress} />
      )}
      <PaperAppBar.Content title={title} subtitle={subtitle} />
      {firstAction && (
        <PaperAppBar.Action
          icon={firstAction.icon}
          onPress={firstAction.onPress}
        />
      )}
      {secondAction && (
        <PaperAppBar.Action
          icon={secondAction.icon}
          onPress={secondAction.onPress}
        />
      )}
    </PaperAppBar.Header>
  );
};

export default Header;
