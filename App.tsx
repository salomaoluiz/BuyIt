import * as React from 'react';
import AppNavigator from '@navigator';
import { Provider } from 'react-redux';
import createStore from '@store';
import RNBootSplash from 'react-native-bootsplash';
import Banner from '@components/banner';
import firebaseInit from 'src/firebase';
import { Provider as PaperProvider } from 'react-native-paper';
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
