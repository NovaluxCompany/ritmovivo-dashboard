import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators'
import { TokenService} from './token.service'
import { ResponseLogin } from '../interfaces/interfaces'
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class AuthService{ 
  private http = inject(HttpClient)
  private token = inject(TokenService)
  env = environment

  private url = this.env.urlBD + "/auth/login"

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




