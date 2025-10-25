import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const register = (data) => API.post('auth/register', data);
export const login = (data) => API.post('auth/login', data);
export const me = (token) => API.get('auth/me', { headers: { Authorization: `Bearer ${token}` } });
export const logout = (token) => API.post('auth/logout', {}, { headers: { Authorization: `Bearer ${token}` } });
