// @ts-nocheck
import { BannerAd, TestIds, BannerAdSize } from '@react-native-firebase/admob';
import React from 'react';
import Config from 'react-native-config';

const AdmobBanner = () => {
  const bannerAdID = __DEV__
    ? TestIds.BANNER
    : Config.ADMOB_BANNER_ID_CAMPAING || Config.ADMOB_BANNER_ID_DEFAULT;

  return (
    <BannerAd
      unitId={bannerAdID}
      size={BannerAdSize.FULL_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />
  );
};

export default AdmobBanner;
