import * as React from 'react';
import useBanner from './useBanner';
import { Container } from './styles';
import { Banner as PaperBanner } from 'react-native-paper';

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
