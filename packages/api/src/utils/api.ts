import { ApiResponse } from '../types';

export function createSuccessResponse<T>(data: T, message?: string): ApiResponse<T> {
  return {
    success: true,
    data,
    message,
  };
}

export function createErrorResponse(error: string): ApiResponse {
  return {
    success: false,
    error,
  };
}
