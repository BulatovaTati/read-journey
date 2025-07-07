import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { clearAuthorizationHeader, setAuthorizationHeader } from '../../helpers/helpers';
import { RootState } from '../store';
import { AuthResponse, Credentials, CurrentUserResponse } from './auth-types';

export const registerUser = createAsyncThunk<AuthResponse, Credentials, { rejectValue: string }>(
  '/users/signup',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<AuthResponse>('/users/signup', credentials);
      setAuthorizationHeader(data.token);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
export const loginUser = createAsyncThunk<AuthResponse, Credentials, { rejectValue: string }>(
  '/users/signin',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<AuthResponse>('/users/signin', credentials);
      setAuthorizationHeader(data.token);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const logOutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  '/users/signout',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post('/users/signout');
      clearAuthorizationHeader();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchCurrentUser = createAsyncThunk<CurrentUserResponse, void, { state: RootState }>(
  '/users/current',
  async (_, { rejectWithValue, getState }) => {
    const state = getState();
    const authToken = state.auth.token;

    if (!authToken) {
      return rejectWithValue('Failed to retrieve user data');
    }

    try {
      setAuthorizationHeader(authToken);
      const { data } = await axios.get<CurrentUserResponse>('/users/current');
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
