import { AppError } from '@core/datatypes';
import { AppErrorModel } from '@core/models';
import { Observable, catchError, throwError } from 'rxjs';

export const handleErrorPipeUtil = (params: Omit<AppError, 'error'> = {}) => {
  return <S = unknown>(source: Observable<S>) => {
    return source.pipe(
      catchError((unknownError: unknown) => {
        if (unknownError instanceof AppErrorModel) {
          return throwError(() => {
            const appError = new AppErrorModel({
              error: unknownError.error,
              ...params,
            });
            return appError;
          });
        }

        return throwError(() => {
          const appError = new AppErrorModel({
            error: unknownError,
            ...params,
          });
          return appError;
        });
      })
    );
  };
};
