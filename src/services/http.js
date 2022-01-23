import axios from 'axios';

import { API_URL } from 'config/config.js';

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 8000,
});

axiosInstance.interceptors.request.use(function (req) {
  const jwt = localStorage.getItem('userJwt');
  // config.headers.Authorization = jwt ? `Bearer' ${jwt}` : '';
  if (jwt) {
    console.log('dodaj jwt????????');
    req.headers.Authorization = 'Bearer ' + jwt;
  }
  return req;
});

export default axiosInstance;
