import axios from 'axios';

axios.defaults.baseURL = 'https://readjourney.b.goit.study/api';

export const setAuthorizationHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthorizationHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};
