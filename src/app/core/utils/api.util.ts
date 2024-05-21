import { HttpEvent, HttpResponse } from '@angular/common/http';
import { environment } from '@env';
import { Observable, catchError, map, throwError } from 'rxjs';

export const isApiRequest = (url: string) => url.includes(environment.API_URL);

export const execAfterResponsePipe =
  <T = unknown>(params: {
    execFn: (res: HttpResponse<T>) => void;
    errorFn?: (err: unknown) => void;
  }) =>
  (source: Observable<HttpEvent<T>>) => {
    return source.pipe(
      map((event) => {
        if (event instanceof HttpResponse) {
          params.execFn(event);
        }
        return event;
      }),
      catchError((err) => {
        params.errorFn?.(err);
        return throwError(() => err);
      })
    );
  };
