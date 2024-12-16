import { HttpInterceptorFn } from '@angular/common/http';

export const RequestInterceptor: HttpInterceptorFn = (req, next) => {
  // Clone the request to include credentials (cookies)
  //This will also set cookies value into the browser Application > cookies
  const modifiedReq = req.clone({
    withCredentials: true, // Send cookies with the request
  });
  return next(modifiedReq);
};
