import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import FullscreenLoader from '@components/fullscreen-loader';

import AuthenticatedNavigator from './authenticated';
import { setNavigator } from './services/navigationService';
import UnauthenticatedNavigator from './unauthenticated';
import useNavigator from './useNavigator';

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

    </NavigationContainer>
  );
};

export default AppNavigator;
