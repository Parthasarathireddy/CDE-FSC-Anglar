import { Injectable } from '@angular/core';

const ACCESS_TOKEN ='access_token';
const REFRESH_TOKEN = 'refresh_token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  getToken(): String{

    return localStorage.getItem(ACCESS_TOKEN);
  
  }
  getRefreshToken(): String{
  
    return localStorage.getItem(REFRESH_TOKEN);
  }

  saveToken(token): void {
    localStorage.setItem(ACCESS_TOKEN, token)
  }

  saveRefreshToken(refreshtoken): void {
    localStorage.setItem(REFRESH_TOKEN, refreshtoken)
  }

  removeToken():void {
    localStorage.removeItem(ACCESS_TOKEN);
  }

  removeRefreshToken():void {
    localStorage.removeItem(REFRESH_TOKEN);
  }
}




