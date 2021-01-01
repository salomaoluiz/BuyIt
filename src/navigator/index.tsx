import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthenticatedNavigator from './authenticated';
import UnauthenticatedNavigator from './unauthenticated';

import useNavigator from './useNavigator';
import FullscreenLoader from '@components/fullscreen-loader';
import { setNavigator } from './services/navigationService';
import AdmobBanner from '@components/admob-banner';

const AppNavigator = () => {
  const { isAuthenticated, isRehydrated } = useNavigator();

  const shouldShowLoading = !isRehydrated;
  const shouldShowLogin = isRehydrated && !isAuthenticated;
  const shouldShowApp = isRehydrated && isAuthenticated;

  return (
    <NavigationContainer ref={setNavigator} independent>
      {shouldShowLoading && <FullscreenLoader />}
      {shouldShowLogin && <UnauthenticatedNavigator />}
      {shouldShowApp && <AuthenticatedNavigator />}
      <AdmobBanner />
    </NavigationContainer>
  );
};

export default AppNavigator;
