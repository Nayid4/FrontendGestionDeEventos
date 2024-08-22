import { HttpInterceptorFn } from '@angular/common/http';

export const autenticacionInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
