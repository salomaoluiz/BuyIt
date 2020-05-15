import * as React from 'react';
import AppNavigator from '@navigator';
import { Provider } from 'react-redux';
import createStore from '@store';

const { store } = createStore();
const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
