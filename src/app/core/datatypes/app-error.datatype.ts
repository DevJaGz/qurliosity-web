export interface AppError<T = unknown> {
  devMessage?: string;
  userMessage?: string;
  appCode?: string;
  error: T;
}
