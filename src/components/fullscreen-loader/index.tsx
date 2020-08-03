import * as React from 'react';
import { Container } from './styles';
import { colors } from '@styles';
import { ActivityIndicator } from 'react-native';

const FullscreenLoader = () => {
  return (
    <Container>
      <ActivityIndicator size={'large'} color={colors.list.brandPrimaryDark} />
    </Container>
  );
};

export default FullscreenLoader;
