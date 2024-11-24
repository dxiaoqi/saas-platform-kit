import { AuthRoutes } from '../types';

export const API_BASE = '/api';

export const authRoutes: AuthRoutes = {
  login: {
    path: `${API_BASE}/auth/login`,
    method: 'POST',
  },
  register: {
    path: `${API_BASE}/auth/register`,
    method: 'POST',
  },
  me: {
    path: `${API_BASE}/auth/me`,
    method: 'GET',
  },
  logout: {
    path: `${API_BASE}/auth/logout`,
    method: 'POST',
  },
};

export const routes = {
  auth: authRoutes,
};
