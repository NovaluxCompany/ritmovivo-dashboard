import { Injectable } from '@angular/core';

export interface ResponseLogin{
  access_token: string
}

@Injectable({
  providedIn: 'root',
})
export class Token {
  constructor () {}

  saveToken(token: string){
    localStorage.setItem('token', token)
  }

  getToken(){
    const token = localStorage.getItem('token')
    return token
  }

  removeToken(){
    localStorage.removeItem('token')
  }
}
