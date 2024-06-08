import { HttpEvent, HttpResponse } from '@angular/common/http';
import { API_REQUEST_AVOID_LOADING } from '@core/constants';
import { environment } from '@env';
import { Observable, catchError, map, throwError } from 'rxjs';

export const isApiRequest = (url: string) => url.includes(environment.API_URL);

export const isApiRequestAvoidLoading = (url: string, method: string) => {
  return API_REQUEST_AVOID_LOADING.some((avoid) => {
    const includesMethod = avoid.methods.includes(method.toUpperCase());
    const matchesRegex = new RegExp(avoid.regex).test(url);
    return Boolean(includesMethod && matchesRegex);
  });
};

export const execAfterResponsePipe =
  <T = unknown>(params: {
    execFn: (res: HttpResponse<T>) => HttpResponse<T> | void;
    errorFn?: (err: unknown) => void;
  }) =>
  (source: Observable<HttpEvent<T>>) => {
    return source.pipe(
      map((event) => {
        let newEvent = event;
        if (event instanceof HttpResponse) {
          const execFnRes = params.execFn(event);
          if (execFnRes) {
            newEvent = execFnRes;
          }
        }
        return newEvent;
      }),
      catchError((err) => {
        params.errorFn?.(err);
        return throwError(() => err);
      })
    );
  };
