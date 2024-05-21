import { AppError } from '@core/datatypes';

export class AppErrorModel<T = unknown> implements AppError<T> {
  readonly #appCode?: string | undefined;
  readonly #devMessage?: string | undefined;
  readonly #userMessage?: string | undefined;
  readonly #error!: T;

  get appCode(): string {
    return this.#appCode || '';
  }

  get devMessage(): string {
    return this.#devMessage || '';
  }

  get userMessage(): string {
    return (
      this.#userMessage ||
      "Sorry, there was an unexpected error. Qurliosity is working on it, and it'll have things fixed as soon as possible."
    );
  }

  get error(): T {
    return this.#error;
  }

  constructor(params: AppError<T>) {
    this.#error = params.error;
    this.#appCode = params.appCode;
    this.#devMessage = params.devMessage;
    this.#userMessage = params.userMessage;
  }
}
