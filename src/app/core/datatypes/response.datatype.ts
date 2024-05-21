export interface ApiResponse<T> {
  payload: T;
  success: boolean;
  statusCode: number;
}
