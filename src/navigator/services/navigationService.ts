import {
  CommonActions,
  NavigationContainerRef,
} from '@react-navigation/native';

const config: {
  navigator?: NavigationContainerRef;
} = {};

export function setNavigator(nav: NavigationContainerRef) {
  if (nav) {
    config.navigator = nav;
  }
}

function navigate(name: string, params?: object) {
  if (config.navigator && name) {
    const action = CommonActions.navigate({ name, params });
    config.navigator.dispatch(action);
  }
}

function goBack() {
  if (config.navigator) {
    const action = CommonActions.goBack();
    config.navigator.dispatch(action);
  }
}

const navigationService = {
  navigate,
  goBack,
};

export default navigationService;
