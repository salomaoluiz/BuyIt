import { AuthActions, AuthState, AuthTypes, AuthReducer } from './types';

const initialState: AuthState = {
  isLogged: false,
  isOnline: false,
  isLoading: false,
  isAnonymously: false,
  email: '',
  currentUser: undefined,
};

const setLoading: AuthReducer = (
  state: AuthState,
  actions: AuthActions<AuthState>,
): AuthState => ({
  ...state,
  isLoading: !!actions.payload.isLoading,
});

const logout: AuthReducer = (state: AuthState): AuthState => ({
  ...state,
  ...initialState,
});

const login: AuthReducer = (
  state: AuthState,
  actions: AuthActions<AuthState>,
): AuthState => ({
  ...state,
  isLogged: true,
  isOnline: true,
  isAnonymously: false,
  currentUser: actions.payload?.currentUser,
});

const loginAnonymously = (
  state: AuthState,
  actions: AuthActions<AuthState>,
): AuthState => ({
  ...state,
  isLogged: false,
  isOnline: !!actions.payload.isOnline,
  isAnonymously: true,
});

const authReducerMap = new Map<AuthTypes, AuthReducer>([
  [AuthTypes.SET_LOADING, setLoading],
  [AuthTypes.LOGOUT, logout],
  [AuthTypes.LOGIN_ANONYMOUSLY, loginAnonymously],
  [AuthTypes.LOGIN, login],
]);

const reducer = (
  state: AuthState = initialState,
  actions: AuthActions<AuthState>,
): AuthState => {
  const authReducer = authReducerMap.get(actions.type);
  if (authReducer) return authReducer(state, actions);
  return state;
};

export default reducer;
