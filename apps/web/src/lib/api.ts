import { ApiClient } from '@saas-platform/api/src/index';
import axios from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
const requestInstance = axios.create({
  baseURL: baseUrl,
});
export const api = new ApiClient(requestInstance as any);
