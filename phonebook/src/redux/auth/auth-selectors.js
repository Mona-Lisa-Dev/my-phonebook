export const getIsAuthorized = state => state.auth.isAuthorized;
export const getUserName = state => state.auth.user.name;

export const getLoadingUser = state => state.auth.loading;

export const getErrorSignup = state => state.auth.errorSignup;
export const getErrorLogin = state => state.auth.errorLogin;
// export const getErrorLogout = state => state.auth.errorLogout;
// export const getErrorCurrentUserData = state => state.auth.errorCurrentUserData;

export const getError = state => state.auth.error;
