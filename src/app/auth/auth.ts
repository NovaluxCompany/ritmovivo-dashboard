import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators'
import { Token, ResponseLogin } from '../core/service/token'
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class AuthService{ 
  constructor(
    private http: HttpClient,
    private token: Token
  ) {}
  private url = "https://ritmovivo-dashboard-api.onrender.com/api/auth/login"

  loginDB(email: string, password: string) {
    
      return this.http.post<ResponseLogin>(this.url,
        {
          email,
          password
        })
        .pipe(
          tap(Response => {
            this.token.saveToken(Response.access_token)
          })
        )
  }
}




