import { ErrorHandler, Injectable, inject } from '@angular/core';
import { AppErrorModel } from '@core/models';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class AppErrorService implements ErrorHandler {
  readonly #messageService = inject(MessageService);

  handleError(error: unknown): void {
    if (error instanceof AppErrorModel) {
      return this.#handleAppError(error);
    }

    console.error(error);
  }

  #handleAppError(appError: AppErrorModel): void {
    if (appError.userMessage) {
      this.#messageService.add({
        severity: 'error',
        summary: this.#truncateMessage(appError.userMessage, 70),
        life: 10000,
      });
    }
  }

  #truncateMessage(message: string, maxLength: number): string {
    if (message.length <= maxLength) {
      return message;
    }
    return message.substring(0, maxLength - 3) + '...';
  }
}
