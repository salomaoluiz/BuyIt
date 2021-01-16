import React from 'react';
import RNBootSplash from 'react-native-bootsplash';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';

import Banner from '@components/banner';
import AppNavigator from '@navigator';
import createStore from '@store';
import firebaseInit from 'src/firebase';
import theme from 'src/styles/theme';

const { store } = createStore();
const App = () => {
  RNBootSplash.hide();
  firebaseInit();
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <Banner />
        <AppNavigator />
      </PaperProvider>
    </Provider>
  );
};

export default App;
