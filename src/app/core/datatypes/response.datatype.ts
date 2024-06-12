export interface ApiResponse<T> {
  payload: T;
  success: boolean;
  statusCode: number;
}

export interface ApiResponseError extends ApiResponse<{ issues: string[] }> {}
