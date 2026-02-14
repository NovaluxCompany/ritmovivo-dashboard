import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators'
import { Token, ResponseLogin } from './token.service'

@Injectable({
  providedIn: 'root',
})

export class AuthService{ 
  private http = inject(HttpClient)
  private token = inject(Token)

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




