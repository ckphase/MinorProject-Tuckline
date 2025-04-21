import axiosClient from 'axios';

const axios = axiosClient.create({
  // baseURL: 'http://13.216.24.239/tuckline/api',
  baseURL: 'http://localhost:3001/api',
  withCredentials: true,
});

// axios.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response.status === 401) {
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

export { axios };
