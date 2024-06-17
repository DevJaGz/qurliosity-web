import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { ApiResponse, ApiResponseError } from '@core/datatypes';
import { throwAppError } from '@core/utils';
import { removeDomainFromMessage } from '@shared/utils';

@Injectable({
  providedIn: 'root',
})
export class ApiErrorService implements ErrorHandler {
  readonly #defaultUserMessage = 'Sorry, there was an error with the request.';

  handleError(error: unknown): void {
    try {
      if (error instanceof HttpErrorResponse) {
        this.#handleErrorResponse(error);
      }
    } catch (error) {
      setTimeout(() => {
        throw Error('An error occurred while handling the API error.');
      }, 0);
    }
  }

  #handleErrorResponse(httpError: HttpErrorResponse): void {
    let apiResponse = httpError.error as ApiResponseError;

    // It is a failed request with observe events in HttpClient Options
    if (typeof apiResponse === 'string') {
      console.log('string');
      apiResponse = JSON.parse(apiResponse);
      this.#handleFailedEventsRequest(httpError, apiResponse);
      this.#logError(httpError, apiResponse);
      return;
    }

    const firstIssue = apiResponse.payload.issues[0];
    if (
      firstIssue &&
      firstIssue.includes('Error: 401 Incorrect API key provided')
    ) {
      this.#handleFailedEventsRequest(httpError, apiResponse);
      this.#logError(httpError, apiResponse);
      return;
    }

    this.#logError(httpError, apiResponse);
  }

  #logError(httpError: HttpErrorResponse, apiResponse: ApiResponseError): void {
    console.log(removeDomainFromMessage(httpError.message), apiResponse);
  }

  #handleFailedEventsRequest(
    httpError: HttpErrorResponse,
    apiResponse: ApiResponseError
  ): void {
    const issues = apiResponse.payload.issues;
    if (issues.length === 0) {
      return;
    }
    setTimeout(() => {
      // SetTimeout is required when using observe events in HttpClient Options
      const userMessage =
        this.#getTextAfterError(issues[0]) || this.#defaultUserMessage;
      throwAppError({
        error: httpError,
        userMessage,
      });
    }, 0);
  }

  #getTextAfterError(text: string): string | null {
    const regex = /Error: \d+ (.+)/;
    const match = text.match(regex);
    return match ? match[1] : null;
  }
}
