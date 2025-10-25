import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8000/api',
});

export const register = (data) => API.post('auth/register', data);
export const login = (data) => API.post('auth/login', data);
export const me = (token) => API.get('/me', { headers: { Authorization: `Bearer ${token}` } });
export const logout = (token) => API.post('/logout', {}, { headers: { Authorization: `Bearer ${token}` } });
