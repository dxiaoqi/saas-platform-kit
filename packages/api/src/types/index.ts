import { userSchema, loginSchema, registerSchema } from '../schemas/auth';

// Auth Types
// export type User = z.infer<typeof userSchema>;
// export type LoginInput = z.infer<typeof loginSchema>;
// export type RegisterInput = z.infer<typeof registerSchema>;
export interface RequestInstance<T = any> {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: T;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

// Route Types
export interface Route {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
}

// Auth Routes
export interface AuthRoutes {
  login: Route;
  register: Route;
  me: Route;
  logout: Route;
}
