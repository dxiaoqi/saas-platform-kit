export * from './types';
export * from './routes';

interface RequestConfig {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
}
interface requestInstance {
  request: (config: RequestConfig) => Promise<Response>;
  get: (config: RequestConfig) => Promise<Response>;
  post: (config: RequestConfig) => Promise<Response>;
  put: (config: RequestConfig) => Promise<Response>;
  delete: (config: RequestConfig) => Promise<Response>;
}
class ApiClient {
  private requestInstance: requestInstance;
  constructor(requestInstance: requestInstance) {
    this.requestInstance = requestInstance;
  }
  async login(data: any) {
    return this.requestInstance.post({
      url: `/auth/login`,
      method: 'POST',
      body: data,
    });
  }
  async register(data: any) {
    return this.requestInstance.post({
      url: `/auth/register`,
      method: 'POST',
      body: data,
    });
  }
  async me() {
    return this.requestInstance.get({
      url: `/auth/me`,
      method: 'GET',
    });
  }
}

export { ApiClient };
