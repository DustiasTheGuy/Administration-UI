import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';
import { StateService } from 'src/app/services/state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private stateService: StateService,
    private router: Router) {}

  public setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  public clearToken(): void {
    localStorage.removeItem('token');
  }

  public signOut(msg: string): void {
    this.clearToken();
    this.router.navigate(['/sign-in']);
    this.stateService.setErrorSubject({
      show: true,
      error: false,
      text: msg
    });
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
