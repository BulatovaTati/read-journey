export interface User {
  name: string | null;
  email: string | null;
}

export interface Credentials {
  email: string;
  password: string;
  name?: string;
}

export interface AuthResponse {
  name: string;
  email: string;
  token: string;
  refreshToken?: string;
}

export type CurrentUserResponse = User;

export interface AuthState {
  user: User | { name: null; email: null };
  token: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
  isLoading: boolean;
  error: string | null;
}
