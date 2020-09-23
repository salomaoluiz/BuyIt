import { useCallback, useEffect } from 'react';
import admob, {
  MaxAdContentRating,
  InterstitialAd,
  AdEventType,
  TestIds,
} from '@react-native-firebase/admob';
import Config from 'react-native-config';

const admobInit = () => {
  return admob().setRequestConfiguration({
    maxAdContentRating: MaxAdContentRating.G,
    tagForChildDirectedTreatment: false,
    tagForUnderAgeOfConsent: false,
  });
};

export const useInterstitialAd = () => {
  const bannerAdID = __DEV__
    ? TestIds.INTERSTITIAL
    : Config.ADMOB_INTERSTITIAL_ID_CAMPAING ||
      Config.ADMOB_INTERSTITIAL_ID_DEFAULT;

  const interstitial = InterstitialAd.createForAdRequest(bannerAdID, {
    requestNonPersonalizedAdsOnly: true,
  });

  let eventListener: Function | undefined;
  const showAd = useCallback(() => {
    eventListener = interstitial.onAdEvent((type) => {
      if (type === AdEventType.LOADED) {
        interstitial.show({ immersiveModeEnabled: true });
      }
    });
    interstitial.load();
  }, []);

  useEffect(() => {
    return () => {
      if (eventListener) eventListener();
    };
  }, []);
  return {
    showAd,
  };
};

export default admobInit;
