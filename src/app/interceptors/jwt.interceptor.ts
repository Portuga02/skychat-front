import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  // Pega o token gravado no localStorage
  const token = localStorage.getItem('token');

  // Se o token existir, clona a requisição e adiciona o header Authorization
  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  }

  // Se não houver token, segue a requisição normal (ex: /login ou /register)
  return next(req);
};