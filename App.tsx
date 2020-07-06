import * as React from 'react';
import AppNavigator from '@navigator';
import { Provider } from 'react-redux';
import createStore from '@store';
import RNBootSplash from 'react-native-bootsplash';

const { store } = createStore();
const App = () => {
  RNBootSplash.hide(); // fade

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
