import { HttpInterceptorFn } from '@angular/common/http';

export const cookieInterceptor: HttpInterceptorFn = (req, next) => {
  const modifiedReq = req.clone({
    withCredentials: true,
  });
  return next(modifiedReq);
};
