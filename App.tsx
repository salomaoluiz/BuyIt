import * as React from 'react';
import AppNavigator from '@navigator';
import { Provider } from 'react-redux';
import createStore from '@store';
import RNBootSplash from 'react-native-bootsplash';
import NotificationCard from '@components/notification-card';

const { store } = createStore();
const App = () => {
  RNBootSplash.hide();

  return (
    <Provider store={store}>
      <AppNavigator />
      <NotificationCard />
    </Provider>
  );
};

export default App;
