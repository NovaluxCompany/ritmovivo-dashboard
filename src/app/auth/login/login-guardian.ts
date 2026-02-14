import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router,} from '@angular/router';
import { LoginService } from '../../core/service/login.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuardian implements CanActivate{
  constructor(private loginService: LoginService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if(this.loginService.isAuthenticated()){
      return true
    } else {
      this.router.navigate(['login'])
      return false
    }
  }
}