import * as React from 'react';
import { Banner as PaperBanner } from 'react-native-paper';

import { Container } from './styles';
import useBanner from './useBanner';

const Banner = () => {
  const { body, icon, isVisible, bannerActions } = useBanner();

  if (isVisible && body && bannerActions) {
    return (
      <Container>
        <PaperBanner actions={bannerActions} visible={isVisible} icon={icon}>
          {body}
        </PaperBanner>
      </Container>
    );
  }

  return null;
};

export default Banner;
