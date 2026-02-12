import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators'
import { Token } from '../core/service/token'

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
    
      return this.http.post(this.url,
        {
          email,
          password
        })
        .pipe(
          tap(Response => {
            this.token.saveToken(Response)
          })
        )
  }
}


