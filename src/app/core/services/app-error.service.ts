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
        summary: appError.userMessage,
        life: 5000,
      });
    }
  }
}
