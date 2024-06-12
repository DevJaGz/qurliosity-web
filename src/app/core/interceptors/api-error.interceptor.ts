import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { ApiErrorService } from '@core/services';
import { execAfterResponsePipe, isApiRequest } from '@core/utils';

export const apiErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const apiErrorService = inject(ApiErrorService);

  if (!isApiRequest(req.url)) {
    return next(req);
  }

  const execFn = (event: HttpResponse<unknown>) => {
    return event;
  };

  const errorFn = (error: unknown) => {
    apiErrorService.handleError(error);
  };

  return next(req).pipe(
    execAfterResponsePipe({
      execFn,
      errorFn,
      reThrowError: true,
    })
  );
};
