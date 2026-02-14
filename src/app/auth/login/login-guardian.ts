import { inject, Injectable } from '@angular/core';
import { CanActivate, Router,} from '@angular/router';
import { LoginService } from '../../core/service/login.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuardian implements CanActivate{
  private loginService = inject(LoginService)
  private router = inject(Router)

  canActivate(): boolean {
    if(this.loginService.isAuthenticated()){
      return true
    } else {
      this.router.navigate(['login'])
      return false
    }
  }
}