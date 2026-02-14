import { Injectable } from '@angular/core';

export interface ResponseLogin{
  access_token: string
}

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor () {}

  saveToken(token: string){
    sessionStorage.setItem('token', token)
  }

  getToken(): string | null{
    const token = sessionStorage.getItem('token')
    return token
  }

  removeToken(){
    localStorage.removeItem('token')
    sessionStorage.removeItem('token')
  }
}
