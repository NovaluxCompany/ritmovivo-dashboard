import { inject, Injectable } from '@angular/core';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private token = inject(TokenService)

  isAuthenticated(){
    const valorToken = this.token.getToken()

    return valorToken != null && valorToken != ''
  }
}
