import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { AppErrorModel } from '@core/models';
import { removeDomainFromMessage } from '@shared/utils';

@Injectable({
  providedIn: 'root',
})
export class AppErrorService implements ErrorHandler {
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
      alert(appError.userMessage);
    }
  }
}
