import axios from 'axios';

const API = axios.create({ baseURL: 'https://sthospitalbackend.onrender.com/api' });

API.interceptors.request.use((req) => {
 const token = localStorage.getItem('adminToken') || localStorage.getItem('staffToken');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;


// const API = axios.create({ baseURL: 'https://sthospitalbackend.onrender.com/api' });
