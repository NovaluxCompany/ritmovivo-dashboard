import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpContext ,HttpContextToken } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../service/token.service';

const CHECK_TOKEN = new HttpContextToken<boolean>(()=> false)

export function checkToken(){
  return new HttpContext().set(CHECK_TOKEN, true)
}

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  if(req.context.get(CHECK_TOKEN)){
    return addToken(req, next, tokenService);
  }
  return next(req);

};

function addToken(request: HttpRequest<unknown>, next: HttpHandlerFn, tokenService: TokenService) {
  const accessToken = tokenService.getToken();

  if (accessToken) {
    const authRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return next(authRequest); 
  }
  return next(request);
}
