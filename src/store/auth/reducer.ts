import { authActions } from './';
import { AuthAction, AuthState, AuthTypes, AuthReducer } from './types';

const initialState: AuthState = {
  isLogged: false,
  isLoading: false,
  isAnonymously: false,
  email: '',
  currentUser: undefined,
  error: undefined,
};

const logout: AuthReducer = (state) => ({
  ...state,
  isLogged: false,
  isLoading: false,
  isAnonymously: false,
  currentUser: undefined,
  error: undefined,
});

const login: AuthReducer = (state, action) => {
  const { payload } = action as ReturnType<typeof authActions.login>;

  return {
    ...state,
    isLogged: true,
    isAnonymously: false,
    isLoading: false,
    currentUser: payload.currentUser,
  };
};

const requestLoginEmailPassword: AuthReducer = (state) => ({
  ...state,
  isLoading: true,
  error: undefined,
});

const requestLoginAnonymously: AuthReducer = (state) => ({
  ...state,
  isLogged: false,
  isLoading: false,
  isAnonymously: true,
});

const requestRegisterEmailPassword: AuthReducer = (state) => ({
  ...state,
  isLogged: false,
  isLoading: true,
  error: undefined,
});

const registerSuccess: AuthReducer = (state) => ({
  ...state,
  isLogged: false,
  isLoading: false,
  error: undefined,
});

const authError: AuthReducer = (state, action) => {
  const { payload } = action as ReturnType<typeof authActions.authError>;

  return {
    ...state,
    isLoading: false,
    error: payload.error,
  };
};

const authReducerMap = new Map<AuthTypes, AuthReducer>([
  [AuthTypes.LOGOUT, logout],
  [AuthTypes.REQUEST_LOGIN_ANONYMOUSLY, requestLoginAnonymously],
  [AuthTypes.REQUEST_LOGIN_EMAIL_PASSWORD, requestLoginEmailPassword],
  [AuthTypes.LOGIN, login],
  [AuthTypes.AUTH_ERROR, authError],
  [AuthTypes.REQUEST_REGISTER_EMAIL_PASSWORD, requestRegisterEmailPassword],
  [AuthTypes.REGISTER_SUCCESS, registerSuccess],
]);

const reducer = (
  state: AuthState = initialState,
  action: AuthAction<AuthState>,
): AuthState => {
  const authReducer = authReducerMap.get(action.type);
  if (authReducer) return authReducer(state, action);
  return state;
};

export default reducer;
