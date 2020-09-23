import admob, { InterstitialAd } from '@react-native-firebase/admob';
import { act, renderHook } from '@testing-library/react-hooks';

import admobInit, { useInterstitialAd } from '../admob';

const mockSetConfig = jest.fn();

jest.mock('globals', () => ({
  __DEV__: false,
}));
jest.mock('react-native-config', () => ({
  ADMOB_INTERSTITIAL_ID_DEFAULT: 'ADMOB_INTERSTITIAL_ID_DEFAULT',
}));
jest.mock('@react-native-firebase/admob', () => ({
  __esModule: true,
  default: jest.fn(() => ({ setRequestConfiguration: mockSetConfig })),
  MaxAdContentRating: {
    G: 'G',
  },
  AdEventType: {
    LOADED: 'loaded',
  },
  InterstitialAd: {
    createForAdRequest: jest.fn(),
  },
  TestIds: {
    INTERSTITIAL: 'INTERSTITIAL',
  },
}));

describe('Firebase Admob', () => {
  const spyAdEvent = jest.fn().mockImplementationOnce((func) => func('loaded'));

  const spyShow = jest.fn();
  const spyLoad = jest.fn();

  jest.spyOn(InterstitialAd, 'createForAdRequest').mockReturnValue({
    onAdEvent: spyAdEvent,
    show: spyShow,
    load: spyLoad,
    loaded: false,
    adUnitId: '12345',
  });

  test('deve inicializar o admob com as configurações corretas', () => {
    admobInit();

    expect(admob).toHaveBeenCalled();
    expect(mockSetConfig).toHaveBeenCalledWith({
      maxAdContentRating: 'G',
      tagForChildDirectedTreatment: false,
      tagForUnderAgeOfConsent: false,
    });
  });

  test('se conseguir carregar o interstitial deve apresenta-lo', () => {
    const { result } = renderHook(useInterstitialAd);

    act(() => {
      result.current.showAd();
    });

    expect(InterstitialAd.createForAdRequest).toHaveBeenCalledWith(
      'INTERSTITIAL',
      {
        requestNonPersonalizedAdsOnly: true,
      },
    );

    expect(spyAdEvent).toHaveBeenCalled();
    expect(spyLoad).toHaveBeenCalled();
    expect(spyShow).toHaveBeenCalledWith({ immersiveModeEnabled: true });
  });

  test('se conseguir nao conseguir carregar o interstitial nao deve apresenta-lo', () => {
    spyAdEvent.mockImplementationOnce((func) => func('error'));
    const { result } = renderHook(useInterstitialAd);

    act(() => {
      result.current.showAd();
    });

    expect(InterstitialAd.createForAdRequest).toHaveBeenCalledWith(
      'INTERSTITIAL',
      {
        requestNonPersonalizedAdsOnly: true,
      },
    );

    expect(spyAdEvent).toHaveBeenCalled();
    expect(spyLoad).toHaveBeenCalled();
    expect(spyShow).not.toHaveBeenCalled();
  });
});
