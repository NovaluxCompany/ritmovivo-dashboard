import { Injectable } from '@angular/core';
import { Token } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private token: Token){

  }

  isAuthenticated(){
    const valorToken = this.token.getToken()

    return valorToken != null && valorToken != ''
  }
}
