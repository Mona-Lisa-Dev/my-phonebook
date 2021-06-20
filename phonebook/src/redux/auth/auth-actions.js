import { createAction } from '@reduxjs/toolkit';

export const signupRequest = createAction('auth/signupRequest');
export const signupSuccess = createAction('auth/signupSuccess');
export const signupError = createAction('auth/signupError');

export const loginRequest = createAction('auth/loginRequest');
export const loginSuccess = createAction('auth/loginSuccess');
export const loginError = createAction('auth/loginError');

export const logoutRequest = createAction('auth/logoutRequest');
export const logoutSuccess = createAction('auth/logoutSuccess');
export const logoutError = createAction('auth/logoutError');

export const getCurrentUserDataRequest = createAction(
  'auth/getCurrentUserDataRequest',
);
export const getCurrentUserDataSuccess = createAction(
  'auth/getCurrentUserDataSuccess',
);
export const getCurrentUserDataError = createAction(
  'auth/getCurrentUserDataError',
);

export const clearError = createAction('auth/clearError');
