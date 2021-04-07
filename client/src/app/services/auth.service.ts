import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
  }

  public setToken(token: string) {
    localStorage.setItem('token', token);
  }

  public clearToken() {
    localStorage.removeItem('token');
  }

  public tokenValid(): boolean {
    let jwtHelperService = new JwtHelperService();
    let token = localStorage.getItem('token');


    if(token != null) {
      return !jwtHelperService.isTokenExpired(token);
    } else {
      return false;
    }
  }
}
