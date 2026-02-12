import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class AuthService{ 
  constructor(
    private http: HttpClient,
  ) {}

  loginDB(email: string, password: string) {
      return this.http.post("https://ritmovivo-dashboard-api.onrender.com/api/auth/login",
        {
          email,
          password
        }
      )
  }
}


