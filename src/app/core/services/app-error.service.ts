import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, inject } from '@angular/core';
import { AppErrorModel } from '@core/models';
import { removeDomainFromMessage } from '@shared/utils';
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
    const error = appError.error;

    if (error instanceof HttpErrorResponse) {
      const httpError = error;
      console.log(removeDomainFromMessage(httpError.message), httpError.error);
    }

    if (appError.userMessage) {
      this.#messageService.add({
        severity: 'error',
        summary: appError.userMessage,
        life: 5000,
      });
    }
  }
}
