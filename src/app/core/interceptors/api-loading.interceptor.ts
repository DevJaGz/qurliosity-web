import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { execAfterResponsePipe, isApiRequest } from '@core/utils';
import { LoaderIndicatorService } from '@shared/services';

export const apiLoadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoaderIndicatorService);

  if (!isApiRequest(req.url)) {
    return next(req);
  }

  loadingService.setLoading(true);

  const execFn = () => {
    loadingService.setLoading(false);
  };

  const errorFn = () => {
    loadingService.setLoading(false);
  };

  return next(req).pipe(
    execAfterResponsePipe({
      execFn,
      errorFn,
    })
  );
};
