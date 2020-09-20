import React, { useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/stack';
import navigationStyles from 'src/styles/navigationStyles';

interface Props {
  showHeader: boolean;
  title?: string;
  showBackButton?: boolean;
}
const useHeader = (props: Props) => {
  const { showBackButton, showHeader, title } = props;
  const navigation = useNavigation();

  const backButton = () => {
    return (
      <HeaderBackButton
        onPress={() => {
          navigation.goBack();
        }}
      />
    );
  };

  useEffect(() => {
    navigation.setOptions({
      ...navigationStyles.defaultHeader,
      headerShown: showHeader,
      title: title,
      headerLeft: showBackButton && backButton,
    });
  }, [props]);
};

export default useHeader;
