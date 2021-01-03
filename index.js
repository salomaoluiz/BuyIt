import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import PushNotification from 'react-native-push-notification';

import App from './App';
import { name as appName } from './app.json';

PushNotification.configure({
  popInitialNotification: true,
  requestPermissions: true,
  permissions: { alert: true, badge: true, sound: true },
});

AppRegistry.registerComponent(appName, () => App);
