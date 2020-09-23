import {
  CommonActions,
  NavigationContainerRef,
  NavigationState,
  PartialState,
} from '@react-navigation/native';

const config: {
  navigator?: NavigationContainerRef;
} = {};

export function setNavigator(nav: NavigationContainerRef) {
  config.navigator = nav;
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

function reset(state: PartialState<NavigationState>) {
  if (config.navigator) {
    const action = CommonActions.reset(state);
    config.navigator.dispatch(action);
  }
}

const navigationService = {
  navigate,
  goBack,
  reset,
};

export default navigationService;
