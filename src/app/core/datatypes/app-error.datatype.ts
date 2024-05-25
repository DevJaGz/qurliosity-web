export interface AppError<T = unknown> {
  devMessage?: string;
  userMessage?: string;
  appCode?: string;
  error: T;
}

export type ValidationAppErrors<T = unknown> = null | { [key: string]: T };
