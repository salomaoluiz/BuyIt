export const useNavigationMocks = {
  setOptions: jest.fn(),
  addListener: jest.fn(),
  canGoBack: jest.fn(),
  dangerouslyGetParent: jest.fn(),
  dangerouslyGetState: jest.fn(),
  dispatch: jest.fn(),
  goBack: jest.fn(),
  isFocused: jest.fn(),
  navigate: jest.fn(),
  removeListener: jest.fn(),
  reset: jest.fn(),
  setParams: jest.fn(),
  openDrawer: jest.fn(),
};

export const useRouteMock = {
  params: {},
  key: '',
  name: ''
};