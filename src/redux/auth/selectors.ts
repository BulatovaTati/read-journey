import { RootState } from '../store';

export const selectToken = (state: RootState) => state.auth.token;
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectIsRefreshing = (state: RootState) => state.auth.isRefreshing;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectUserName = (state: RootState) => state.auth.user.name;
