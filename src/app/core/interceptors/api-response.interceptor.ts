import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { ApiResponse } from '@core/datatypes';
import { execAfterResponsePipe, isApiRequest } from '@core/utils';

export const apiResponseInterceptor: HttpInterceptorFn = (req, next) => {
  if (!isApiRequest(req.url)) {
    return next(req);
  }

  const execFn = (event: HttpResponse<unknown>) => {
    const apiResponse = event.body as ApiResponse<unknown>;
    event = event.clone({ body: apiResponse.payload });
  };

  return next(req).pipe(
    execAfterResponsePipe({
      execFn,
    })
  );
};
