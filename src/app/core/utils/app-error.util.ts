import { AppError } from '@core/datatypes';
import { AppErrorModel } from '@core/models';
import { Observable, catchError, throwError } from 'rxjs';

export const handleErrorPipeUtil = (params: Omit<AppError, 'error'> = {}) => {
  return <S = unknown>(source: Observable<S>) => {
    return source.pipe(
      catchError((unknowError: unknown) => {
        if (unknowError instanceof AppErrorModel) {
          return throwError(() => {
            const appError = new AppErrorModel({
              error: unknowError.error,
              ...params,
            });
            return appError;
          });
        }

        return throwError(() => {
          const appError = new AppErrorModel({
            error: unknowError,
            ...params,
          });
          return appError;
        });
      })
    );
  };
};
