import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

import {
  signupRequest,
  signupSuccess,
  signupError,
  loginRequest,
  loginSuccess,
  loginError,
  logoutRequest,
  logoutSuccess,
  logoutError,
  getCurrentUserDataRequest,
  getCurrentUserDataSuccess,
  getCurrentUserDataError,
  clearError,
  verifyRequest,
  verifySuccess,
  verifyError,
} from './auth-actions';

const initialUserState = { name: null, email: null };

const user = createReducer(initialUserState, {
  [signupSuccess]: (_, { payload }) => payload.user,
  [loginSuccess]: (_, { payload }) => payload.user,
  [logoutSuccess]: () => initialUserState,
  [logoutError]: () => initialUserState,
  [getCurrentUserDataSuccess]: (_, { payload }) => payload,
});

const token = createReducer(null, {
  // [signupSuccess]: (_, { payload }) => payload.token,
  [loginSuccess]: (_, { payload }) => payload.token,
  [logoutSuccess]: () => null,
});

const isAuthorized = createReducer(false, {
  // [signupSuccess]: () => true,
  [loginSuccess]: () => true,
  [getCurrentUserDataSuccess]: () => true,

  [signupError]: () => false,
  [loginError]: () => false,
  [getCurrentUserDataError]: () => false,
  [logoutRequest]: () => false,
});

const needVerify = createReducer(false, {
  [clearError]: () => false,
  [signupSuccess]: () => true,
  [loginSuccess]: () => false,
});

const repeatVerify = createReducer(null, {
  [signupRequest]: () => null,
  [loginRequest]: () => null,
  [verifyRequest]: () => null,
  [verifySuccess]: (_, { payload }) => payload.message,
});

const isLoading = createReducer(false, {
  [signupRequest]: () => true,
  [signupSuccess]: () => false,
  [signupError]: () => false,

  [loginRequest]: () => true,
  [loginSuccess]: () => false,
  [loginError]: () => false,

  [logoutRequest]: () => true,
  [logoutSuccess]: () => false,
  [logoutError]: () => false,

  [getCurrentUserDataRequest]: () => true,
  [getCurrentUserDataSuccess]: () => false,
  [getCurrentUserDataError]: () => false,
});

const setError = (_, { payload }) => payload;

const errorSignup = createReducer(null, {
  [signupError]: setError,
  [signupRequest]: () => null,
  [clearError]: () => null,
});

const errorLogin = createReducer(null, {
  [loginError]: setError,
  [loginRequest]: () => null,
  [clearError]: () => null,
});

// const errorLogout = createReducer(null, {
//   [logoutError]: setError,
//   [logoutRequest]: () => null,
// });

// const errorCurrentUserData = createReducer(null, {
//   [getCurrentUserDataError]: setError,
//   [getCurrentUserDataRequest]: () => null,
// });

const error = createReducer(null, {
  // [signupError]: setError,
  // [signupRequest]: () => null,
  // [loginError]: setError,
  // [loginRequest]: () => null,
  [logoutError]: setError,
  [logoutRequest]: () => null,
  [getCurrentUserDataError]: setError,
  [getCurrentUserDataRequest]: () => null,
});

export default combineReducers({
  user,
  token,
  isAuthorized,
  isLoading,
  error,
  errorSignup,
  errorLogin,
  needVerify,
  repeatVerify,
  // errorLogout,
  // errorCurrentUserData,
});
