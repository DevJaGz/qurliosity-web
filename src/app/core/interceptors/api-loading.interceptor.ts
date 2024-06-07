import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderIndicatorService } from '@shared/services';
import {
  execAfterResponsePipe,
  isApiRequestAvoidLoading,
  isApiRequest,
} from '@core/utils';

export const apiLoadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoaderIndicatorService);
  const url = req.url;

  if (!isApiRequest(url)) {
    return next(req);
  }

  const method = req.method;

  if (isApiRequestAvoidLoading(url, method)) {
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
