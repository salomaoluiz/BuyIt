import * as React from 'react';
import { ActivityIndicator as PaperActivityIndicator } from 'react-native-paper';

import { Container } from './styles';

const FullscreenLoader = () => {
  return (
    <Container>
      <PaperActivityIndicator size={'large'} />
    </Container>
  );
};

export default FullscreenLoader;
